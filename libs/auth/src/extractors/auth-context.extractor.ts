import { AuthContext } from '../interfaces';
import { AuthContextNotFoundException } from '../exceptions';
import { Injectable } from '@nestjs/common';
import { Extractor } from '../interfaces/extractor.interface';
import { ClsService } from '../services/cls.service';
import { AUTH_CONTEXT_KEY } from '../consts/cls-keys';

@Injectable()
export class AuthContextExtractor implements Extractor<AuthContext> {
  public constructor(private readonly clsService: ClsService) {}

  public getOrFail(): AuthContext {
    const context = this.clsService.get<AuthContext>(AUTH_CONTEXT_KEY);

    if (!context) {
      throw new AuthContextNotFoundException();
    }

    return context;
  }
}
