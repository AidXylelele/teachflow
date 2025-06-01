import { CLS_SERVICE } from '@app/cls';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';
import awsCognitoConfig, {
  AwsCognitoConfig,
} from 'src/configs/aws-cognito.config';
import { IClsService } from 'src/core/infrastructure/cls-service.interface';
import { AUTH_CONTEXT_KEY } from '../constants/casl';
import { AbilityFactory } from 'src/core/infrastructure/user-ability-factory.interface';
import { CASL_ABILITY_FACTORY } from 'libs/casl/casl.di-tokens';
import { AuthContext } from 'src/core/application/auth-context.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  readonly #reflector: Reflector;
  readonly #clsService: IClsService;
  readonly #abilityFactory: AbilityFactory;
  readonly #jwtService: CognitoJwtVerifierSingleUserPool<AwsCognitoConfig>;

  public constructor(
    reflector: Reflector,
    @Inject(CASL_ABILITY_FACTORY) abilityFactory: AbilityFactory,
    @Inject(CLS_SERVICE) clsService: IClsService,
    @Inject(awsCognitoConfig.KEY) config: AwsCognitoConfig,
  ) {
    this.#reflector = reflector;
    this.#clsService = clsService;
    this.#abilityFactory = abilityFactory;
    this.#jwtService = CognitoJwtVerifier.create(config);
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

    const payload = await this.#jwtService.verify(token);
    const groups = payload['cognito:groups'];

    if (!groups || !groups.length || groups.length > 1) {
      throw new UnauthorizedException();
    }

    const id = payload.sub;
    const role = groups.toString();
    const identity = { id, role };
    const ability = this.#abilityFactory.createForUser(identity);
    const authContext: AuthContext = { identity, ability };
    this.#clsService.set(AUTH_CONTEXT_KEY, authContext);

    return true;
  }

  #extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
