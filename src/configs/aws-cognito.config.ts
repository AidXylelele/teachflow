import { registerAs } from '@nestjs/config';

export interface AwsCognitoConfig {
  userPoolId: string;
  tokenUse: 'access';
  clientId: string;
}

export default registerAs(
  'aws-cognito',
  (): AwsCognitoConfig => ({
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
    tokenUse: 'access',
    clientId: process.env.AWS_CLIENT_ID!,
  }),
);
