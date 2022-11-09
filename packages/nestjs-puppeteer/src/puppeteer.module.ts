import { Module, type DynamicModule, type Provider } from '@nestjs/common';
import { PUPPETEER_OPTIONS } from './puppeteer.constant.js';
import type {
  PuppeteerModuleAsyncOptions,
  PuppeteerModuleOptions,
  PuppeteerOptionsFactor,
} from './puppeteer.type.js';

@Module({})
export class PuppeteerModule {
  static forRoot(options: PuppeteerModuleOptions = {}): DynamicModule {
    return {
      module: PuppeteerModule,
      providers: [{ provide: PUPPETEER_OPTIONS, useValue: options }],
      exports: [{ provide: PUPPETEER_OPTIONS, useValue: options }],
    };
  }

  static forRootAsync(options: PuppeteerModuleAsyncOptions = {}): DynamicModule {
    const providers = this.createAsyncProviders(options);
    return {
      module: PuppeteerModule,
      imports: options.imports || [],
      providers: providers,
      exports: providers,
    };
  }

  private static createAsyncProviders(options: PuppeteerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        { provide: options.useClass, useClass: options.useClass },
      ];
    }
    return [];
  }

  private static createAsyncOptionsProvider(options: PuppeteerModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: PUPPETEER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useExisting || options.useClass;
    return {
      provide: PUPPETEER_OPTIONS,
      useFactory: (optionsFactory: PuppeteerOptionsFactor) =>
        optionsFactory.createPuppeteerOptions(),
      inject: inject ? [inject] : [],
    };
  }
}
