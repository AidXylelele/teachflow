import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ClsService } from '../services/cls.service';

@Injectable()
export class ClsMiddleware implements NestMiddleware {
  public constructor(private readonly clsService: ClsService) {}

  public use(_req: Request, _res: Response, next: NextFunction): void {
    this.clsService.run(() => next());
  }
}
