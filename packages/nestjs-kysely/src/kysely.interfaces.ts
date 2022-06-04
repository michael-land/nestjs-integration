import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { KyselyConfig } from 'kysely';

export interface KyselyModuleOptions extends KyselyConfig {}

export interface KyselyModuleOptionsFactory {
  createKyselyModuleOptions(): Promise<KyselyModuleOptions> | KyselyModuleOptions;
}

export interface KyselyModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<KyselyModuleOptionsFactory>;
  useExisting?: Type<KyselyModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<KyselyModuleOptions> | KyselyModuleOptions;
}
