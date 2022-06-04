import { Abstract, ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { VanillaPuppeteer } from 'puppeteer-extra';

export type PuppeteerModuleOptions = Parameters<VanillaPuppeteer['launch']>[0];

export interface PuppeteerOptionsFactor {
  createPuppeteerOptions(): Promise<PuppeteerModuleOptions> | PuppeteerModuleOptions;
}

export interface PuppeteerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<PuppeteerOptionsFactor>;
  useClass?: Type<PuppeteerOptionsFactor>;
  useFactory?: (...args: any[]) => Promise<PuppeteerModuleOptions> | PuppeteerModuleOptions;
  inject?: Array<Type<any> | string | symbol | Abstract<any> | (() => any)>;
}
