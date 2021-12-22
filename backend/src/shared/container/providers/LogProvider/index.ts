import { container } from 'tsyringe';
import logCOnfig from '@config/log';

import ILogProvider from './models/ILogProvider';

import Log4jsProvider from './implementations/Log4jsProvider';

const providers = {
  log4js: Log4jsProvider,
};

container.register<ILogProvider>('LogProvider', providers[logCOnfig.driver]);
