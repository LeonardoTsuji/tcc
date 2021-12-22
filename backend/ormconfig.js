const Debug = require('debug');
const log = Debug('api:ormconfig');

log({
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  NODE_ENV: process.env.NODE_ENV,
});
module.exports = {
  logging: process.env.NODE_ENV !== 'production' ? true : false,
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    process.env.NODE_ENV === 'development'
      ? './src/modules/**/infra/typeorm/entities/*.ts'
      : './dist/modules/**/infra/typeorm/entities/*.js',
  ],
  migrations: [
    process.env.NODE_ENV === 'development'
      ? './src/shared/infra/typeorm/migrations/*.ts'
      : './dist/shared/infra/typeorm/migrations/*.js',
  ],
  cli: {
    migrationsDir:
      process.env.NODE_ENV === 'development'
        ? './src/shared/infra/typeorm/migrations'
        : './dist/shared/infra/typeorm/migrations',
  },
};
