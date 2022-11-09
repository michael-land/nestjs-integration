import { Module, type DynamicModule, type Provider } from '@nestjs/common';
import type {
  KyselyModuleAsyncOptions,
  KyselyModuleOptions,
  KyselyModuleOptionsFactory,
} from './kysely.interfaces.js';
import {
  createKyselyConnection,
  getKyselyConnectionToken,
  getKyselyOptionsToken,
} from './kysely.utils.js';

@Module({})
export class KyselyCoreModule {
  static forRoot(options: KyselyModuleOptions, connectionName?: string): DynamicModule {
    const kyselyOptionsProvider: Provider = {
      provide: getKyselyOptionsToken(connectionName),
      useValue: options,
    };

    const kyselyConnectionProvider: Provider = {
      provide: getKyselyConnectionToken(connectionName),
      useValue: createKyselyConnection(options),
    };

    return {
      module: KyselyCoreModule,
      providers: [kyselyOptionsProvider, kyselyConnectionProvider],
      exports: [kyselyOptionsProvider, kyselyConnectionProvider],
    };
  }

  public static forRootAsync(
    options: KyselyModuleAsyncOptions,
    connectionName?: string
  ): DynamicModule {
    const kyselyConnectionProvider: Provider = {
      provide: getKyselyConnectionToken(connectionName),
      useFactory(options: KyselyModuleOptions) {
        return createKyselyConnection(options);
      },
      inject: [getKyselyOptionsToken(connectionName)],
    };

    return {
      module: KyselyCoreModule,
      imports: options.imports ?? [],
      providers: [...this.createAsyncProviders(options, connectionName), kyselyConnectionProvider],
      exports: [kyselyConnectionProvider],
    };
  }

  public static createAsyncProviders(
    options: KyselyModuleAsyncOptions,
    connection?: string
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }

    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options, connection),
        { provide: options.useClass, useClass: options.useClass },
      ];
    }
    return [];
  }

  public static createAsyncOptionsProvider(
    options: KyselyModuleAsyncOptions,
    connection?: string
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getKyselyOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useClass || options.useExisting;
    return {
      provide: getKyselyOptionsToken(connection),
      async useFactory(optionsFactory: KyselyModuleOptionsFactory): Promise<KyselyModuleOptions> {
        return await optionsFactory.createKyselyModuleOptions();
      },
      inject: inject ? [inject] : [],
    };
  }
}
