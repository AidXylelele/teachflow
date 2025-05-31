import { ClsService } from '@app/cls';
import { PackRule, unpackRules } from '@casl/ability/extra';
import { createMongoAbility, MongoQuery, RawRule } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/constants/metadata-keys';
import { AUTH_CONTEXT_KEY } from 'src/common/constants/cls-keys';
import { UUID } from 'crypto';
import { AbilityTupleType } from '@casl/ability/dist/types/types';

interface JwtPayload {
  id: UUID;
  rules: PackRule<RawRule<AbilityTupleType, MongoQuery>>[];
}

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly clsService: ClsService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      targets,
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.#extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      const rules = unpackRules(payload.rules);
      const ability = createMongoAbility(rules);
      const identity = { id: payload.id, ability };
      this.clsService.set(AUTH_CONTEXT_KEY, identity);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  #extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
