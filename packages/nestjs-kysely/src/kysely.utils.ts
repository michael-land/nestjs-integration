import { Dialect, Kysely } from 'kysely';
import {
  KYSELY_MODULE_CONNECTION,
  KYSELY_MODULE_CONNECTION_TOKEN,
  KYSELY_MODULE_OPTIONS_TOKEN,
} from './kysely.constants.js';
import type { KyselyModuleOptions } from './kysely.interfaces.js';

export function getKyselyOptionsToken(connectionName?: string): string {
  return `${connectionName || KYSELY_MODULE_CONNECTION}_${KYSELY_MODULE_OPTIONS_TOKEN}`;
}

export function getKyselyConnectionToken(connectionName?: Dialect | string): string {
  return `${connectionName || KYSELY_MODULE_CONNECTION}_${KYSELY_MODULE_CONNECTION_TOKEN}`;
}

export function createKyselyConnection(options: KyselyModuleOptions) {
  return new Kysely(options);
}
