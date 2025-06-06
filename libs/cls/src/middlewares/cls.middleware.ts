import { Injectable, NestMiddleware } from '@nestjs/common';
import { IClsService } from '../../../../src/core/infrastructure/cls-service.interface';
import { NextFunction } from 'express';

@Injectable()
export class ClsMiddleware implements NestMiddleware {
  public constructor(private readonly clsService: IClsService) {}

  public use(_req: Request, _res: Response, next: NextFunction): void {
    this.clsService.run(() => next());
  }
}
