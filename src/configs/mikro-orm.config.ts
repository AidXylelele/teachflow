import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  client: string;
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  synchronize: boolean;
}

export default registerAs(
  'mikro-orm',
  (): DatabaseConfig => ({
    client: process.env.DATABASE_CLIENT!,
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    name: process.env.DATABASE_NAME!,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  }),
);
