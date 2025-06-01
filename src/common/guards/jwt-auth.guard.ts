import { CLS_SERVICE } from '@app/cls';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';
import awsJwtVerifyConfig, {
  AwsJWTVerifyConfig,
} from 'src/configs/aws-jwt-verify.config';
import { IClsService } from 'src/core/infrastructure/cls-service.interface';
import { AUTH_CONTEXT_KEY } from '../constants/casl';
import { AbilityFactory } from 'src/core/infrastructure/user-ability-factory.interface';
import { CASL_ABILITY_FACTORY } from 'libs/casl/casl.di-tokens';
import { AuthContext } from 'src/core/application/auth-context.interface';
import { Identity } from 'src/core/application/identity.interface';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  readonly #clsService: IClsService;
  readonly #abilityFactory: AbilityFactory;
  readonly #jwtService: CognitoJwtVerifierSingleUserPool<AwsJWTVerifyConfig>;

  public constructor(
    @Inject(CASL_ABILITY_FACTORY) abilityFactory: AbilityFactory,
    @Inject(CLS_SERVICE) clsService: IClsService,
    @Inject(awsJwtVerifyConfig.KEY) config: AwsJWTVerifyConfig,
  ) {
    this.#clsService = clsService;
    this.#abilityFactory = abilityFactory;
    this.#jwtService = CognitoJwtVerifier.create(config);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.#extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    const payload = await this.#jwtService.verify(token);
    const groups = payload['cognito:groups'];

    if (!groups) throw new UnauthorizedException();

    const identity = { id: payload.sub, role: groups.toString() };
    this.#setAuthContext(identity);

    return true;
  }

  #setAuthContext(identity: Identity): void {
    const ability = this.#abilityFactory.createForUser(identity);
    const authContext: AuthContext = { identity, ability };
    this.#clsService.set(AUTH_CONTEXT_KEY, authContext);
  }

  #extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
