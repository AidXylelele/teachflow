import {
  Injectable,
  CanActivate,
  ExecutionContext,
  RawBodyRequest,
  Inject,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Request } from 'express';
import webhooksConfig, { WebhooksConfig } from 'src/configs/webhooks.config';

@Injectable()
export class SignatureGuard implements CanActivate {
  public constructor(
    @Inject(webhooksConfig.KEY) private readonly config: WebhooksConfig,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<RawBodyRequest<Request>>();

    if (!request.rawBody) {
      throw new InternalServerErrorException();
    }

    const signatureHeader = request.headers['x-webhook-signature'] as string;

    if (!signatureHeader) {
      throw new UnauthorizedException();
    }

    const [algorithm, hash] = signatureHeader.split('=');

    if (algorithm !== 'sha256') throw new UnauthorizedException();

    const expected = crypto
      .createHmac(algorithm, this.config.secret)
      .update(request.rawBody)
      .digest('hex');

    const isVerified = crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(expected),
    );

    return isVerified;
  }
}
