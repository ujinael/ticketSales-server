import * as process from 'process';

export const appConfig = () => {
  return {
    appSecret: process.env.JWT_SECRET ?? 'secret',
    appPort: process.env.PORT ?? 4000,
    appConnectionString: process.env.CONNECTION_STRING ?? '',
  };
};
