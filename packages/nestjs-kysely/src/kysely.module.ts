import { DynamicModule, Global, Module } from '@nestjs/common';
import { KyselyCoreModule } from './kysely.core-module';
import { KyselyModuleAsyncOptions, KyselyModuleOptions } from './kysely.interfaces';

@Global()
@Module({})
export class KyselyModule {
  public static forRoot(options: KyselyModuleOptions, connectionName?: string): DynamicModule {
    return {
      module: KyselyModule,
      imports: [KyselyCoreModule.forRoot(options, connectionName)],
      exports: [KyselyCoreModule],
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
    };
  }
}
