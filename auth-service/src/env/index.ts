import { cleanEnv, str, port } from 'envalid';

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  PORT: port({ default: 3001 }),
  JWT_SECRET: str(),
  DATABASE_URL: str(),
});
// This code uses the envalid library to validate environment variables.
// It ensures that the required environment variables are present and have the correct types.