import type { Abstract, ModuleMetadata, Type } from '@nestjs/common/interfaces';
import type { PuppeteerLaunchOptions } from 'puppeteer-core';

export type PuppeteerModuleOptions = PuppeteerLaunchOptions;

export interface PuppeteerOptionsFactor {
  createPuppeteerOptions(): Promise<PuppeteerModuleOptions> | PuppeteerModuleOptions;
}

export interface PuppeteerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PuppeteerOptionsFactor>;
  useClass?: Type<PuppeteerOptionsFactor>;
  useFactory?: (...args: any[]) => Promise<PuppeteerModuleOptions> | PuppeteerModuleOptions;
  inject?: Array<Type<any> | string | symbol | Abstract<any> | (() => any)>;
}
