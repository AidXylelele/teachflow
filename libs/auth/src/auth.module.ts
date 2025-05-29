import { Module } from '@nestjs/common';
import { AUTH_CONTEXT_EXTRACTOR } from './auth.di-tokens';
import { AsyncLocalStorage } from 'async_hooks';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards';
import { AuthContextExtractor } from './extractors';

@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
    { provide: AUTH_CONTEXT_EXTRACTOR, useClass: AuthContextExtractor },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [AUTH_CONTEXT_EXTRACTOR],
})
export class AuthModule {}
