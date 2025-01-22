import * as joi from 'Joi';

export interface IEnvs {
  APP_PORT: number;
  NODE_ENV: string;
}

export const envValidationSchema: joi.ObjectSchema<IEnvs> = joi.object({
  APP_PORT: joi.number().port().required(),
  NODE_ENV: joi.string().required().valid('development', 'production', 'test'),
});
