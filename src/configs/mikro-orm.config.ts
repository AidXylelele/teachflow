import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'mikro-orm',
  (): MikroOrmModuleOptions => ({
    driver: PostgreSqlDriver,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    entities: ['dist/**/*.schema.js'],
    entitiesTs: ['src/**/*.schema.ts'],
    debug: process.env.MIKRO_ORM_DEBUG === 'true',
    loadStrategy: LoadStrategy.JOINED,
    autoLoadEntities: true,
    migrations: {
      tableName: 'mikro_orm_migrations',
      path: './dist/migrations',
      pathTs: './database/migrations',
      glob: '!(*.d).{js,ts}',
      transactional: true,
      disableForeignKeys: false,
      allOrNothing: true,
      dropTables: false,
      safe: true,
      emit: 'ts',
    },
    schema: process.env.DATABASE_SCHEMA || 'public',
  }),
);
