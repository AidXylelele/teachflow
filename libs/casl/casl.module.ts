import { DynamicModule, Module } from '@nestjs/common';
import { CaslModuleOptions } from './interfaces/casl-module-options.interface';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CASL_ABILITY_FACTORY, CASL_MODULE_OPTIONS } from './casl.di-tokens';

@Module({
  providers: [{ provide: CASL_ABILITY_FACTORY, useClass: CaslAbilityFactory }],
  exports: [CASL_ABILITY_FACTORY],
})
export class CaslModule {
  public static register(options: CaslModuleOptions): DynamicModule {
    return {
      global: options.global,
      module: CaslModule,
      providers: [{ provide: CASL_MODULE_OPTIONS, useValue: options }],
    };
  }
}
