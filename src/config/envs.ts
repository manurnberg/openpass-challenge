import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DRAGON_BALL_API_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DRAGON_BALL_API_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dragonBallApiUrl: envVars.DRAGON_BALL_API_URL,
};
