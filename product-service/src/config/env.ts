import { cleanEnv, str } from 'envalid';
import dotenv from 'dotenv';
dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: str(),
  DATABASE_URL: str(),
  AWS_REGION: str(),
  AWS_ACCESS_KEY_ID: str(),
  AWS_SECRET_ACCESS_KEY: str(),
  AWS_S3_BUCKET_NAME: str(),
  LOG_LEVEL: str({ default: 'info' }),
  JWT_SECRET: str({ default: 'supersecretjwtkey'}),
});
