import { Inject } from '@nestjs/common';
import { getKyselyConnectionToken } from './kysely.utils';

export const InjectDatabase = (connectionName?: string) => {
  return Inject(getKyselyConnectionToken(connectionName));
};
