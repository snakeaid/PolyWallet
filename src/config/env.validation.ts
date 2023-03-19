import * as Joi from 'joi';

export const EnvVariablesValidationSchema = Joi.object({
  APP_PORT: Joi.string().allow('', null),

  LOG_LEVEL: Joi.string().valid('error', 'info', 'debug', 'verbose'),
  LOGS_PATH: Joi.string().allow('', null),
  SERVICE_NAME: Joi.string().allow('', null),

  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_CONN_ENCRYPT: Joi.string().allow('', null).valid('true', 'false').default('false'),
});
