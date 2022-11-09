import { Inject } from '@nestjs/common';
import { getKyselyConnectionToken } from './kysely.utils.js';

export const InjectDatabase = (connectionName?: string) =>
  Inject(getKyselyConnectionToken(connectionName));
