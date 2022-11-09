import { Module, type DynamicModule } from '@nestjs/common';
import { KyselyCoreModule } from './kysely.core-module.js';
import type { KyselyModuleAsyncOptions, KyselyModuleOptions } from './kysely.interfaces.js';

@Module({})
export class KyselyModule {
  public static forRoot(options: KyselyModuleOptions, connectionName?: string): DynamicModule {
    return {
      module: KyselyModule,
      imports: [KyselyCoreModule.forRoot(options, connectionName)],
      exports: [KyselyCoreModule],
      global: true,
    };
  }

  public static forRootAsync(
    options: KyselyModuleAsyncOptions,
    connectionName?: string
  ): DynamicModule {
    return {
      module: KyselyModule,
      imports: [KyselyCoreModule.forRootAsync(options, connectionName)],
      exports: [KyselyCoreModule],
      global: true,
    };
  }
}
