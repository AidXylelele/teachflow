import { ClsService } from '@app/cls';
// import { PackRule, unpackRules } from '@casl/ability/extra'; // No longer needed
// import { createMongoAbility, MongoQuery, RawRule } from '@casl/ability'; // No longer needed directly here
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
// import { AbilityTupleType } from '@casl/ability/dist/types/types'; // No longer needed
import { CaslAbilityFactory } from '../../application/factories/casl-ability.factory';
import { UsersRepository } from '../../application/ports/users.repository'; // Assuming this is your repository
import { UserRole } from '../../domain/value-objects/role'; // Updated import path
import { Uuid } from 'src/common/value-objects/uuid';
import { User } from '../../domain/entities/user';

interface JwtPayload {
  id: UUID;
  role: UserRole; // This is UserRole enum from ../../domain/role
  // rules: PackRule<RawRule<MongoQuery>>[]; // Remove rules from JWT payload
}

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly clsService: ClsService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly usersRepository: UsersRepository, // Inject UsersRepository
    private readonly caslAbilityFactory: CaslAbilityFactory, // Inject CaslAbilityFactory
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

      // Fetch the user to ensure they exist and get their current role
      const userEntity: User | undefined = await this.usersRepository.findById(
        Uuid.create(payload.id),
      );
      if (!userEntity) {
        throw new UnauthorizedException('User not found.');
      }
      // At this point, userEntity is confirmed to be User, not undefined.
      const confirmedUserEntity: User = userEntity;

      // It's crucial that the role from the DB is used, not potentially stale role from JWT for Casl rules.
      // However, the JWT role can be used for quick checks or if fetching the user is too slow for every request.
      // For Casl, using the fresh role from userEntity is more secure.
      // If payload.role is significantly different from userEntity.role, it might indicate an issue or a recent role change.

      const ability =
        this.caslAbilityFactory.createForUser(confirmedUserEntity);
      const identity = { id: payload.id, ability };
      this.clsService.set(AUTH_CONTEXT_KEY, identity);
    } catch (e: unknown) {
      // console.error('AuthGuard Error:', e); // Optional: Log the error
      let errorMessage = 'Authentication failed';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      throw new UnauthorizedException(errorMessage);
    }
    return true;
  }

  #extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
