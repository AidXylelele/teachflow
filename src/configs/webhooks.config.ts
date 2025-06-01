import { registerAs } from '@nestjs/config';

export interface WebhooksConfig {
  secret: string;
}

export default registerAs(
  'webhooks',
  (): WebhooksConfig => ({
    secret: process.env.APP_WEBHOOKS_SECRET!,
  }),
);
