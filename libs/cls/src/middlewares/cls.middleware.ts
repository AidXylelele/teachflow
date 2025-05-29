import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { CLS_SERVICE_KEY } from '../cls.di-tokens';
import { IClsService } from '../interfaces/cls-service.interface';
import { NextFunction } from 'express';

@Injectable()
export class ClsMiddleware implements NestMiddleware {
  public constructor(
    @Inject(CLS_SERVICE_KEY) private readonly clsService: IClsService,
  ) {}

  public use(_req: Request, _res: Response, next: NextFunction): void {
    this.clsService.run(() => next());
  }
}
