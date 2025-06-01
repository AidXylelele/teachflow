import { CLS_SERVICE, ClsService } from '@app/cls';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AUTH_CONTEXT } from 'src/common/constants/cls-keys';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';
import awsCognitoConfig, {
  AwsCognitoConfig,
} from 'src/configs/aws-cognito.config';

@Injectable()
export class AuthGuard implements CanActivate {
  readonly #reflector: Reflector;
  readonly #clsService: ClsService;
  readonly #jwtVerifier: CognitoJwtVerifierSingleUserPool<AwsCognitoConfig>;

  public constructor(
    reflector: Reflector,
    @Inject(CLS_SERVICE) clsService: ClsService,
    @Inject(awsCognitoConfig.KEY) config: AwsCognitoConfig,
  ) {
    this.#reflector = reflector;
    this.#clsService = clsService;
    this.#jwtVerifier = CognitoJwtVerifier.create(config);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];

    const isPublic = this.#reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      targets,
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.#extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.#jwtVerifier.verify(token);
      this.#clsService.set(AUTH_CONTEXT, payload);
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
