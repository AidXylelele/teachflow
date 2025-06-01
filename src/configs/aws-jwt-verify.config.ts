import { registerAs } from '@nestjs/config';

export interface AwsJWTVerifyConfig {
  userPoolId: string;
  tokenUse: 'access';
  clientId: string;
}

export default registerAs(
  'aws-jwt-verify',
  (): AwsJWTVerifyConfig => ({
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID!,
    tokenUse: 'access',
    clientId: process.env.AWS_COGNITO_CLIENT_ID!,
  }),
);
