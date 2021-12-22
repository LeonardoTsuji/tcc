interface ILogConfig {
  driver: 'log4js';
}
export default {
  driver: process.env.LOG_DRIVER || 'log4js',
} as ILogConfig;
