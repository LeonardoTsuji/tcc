/* eslint-disable @typescript-eslint/no-explicit-any */
import { configure, getLogger } from 'log4js';
import ILogProvider from '../models/ILogProvider';

let logLevel;

if (process.env.NODE_ENV === 'production') {
  logLevel = 'error';
} else {
  logLevel = 'debug';
}
configure({
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: logLevel } },
});

export default class LogProvider implements ILogProvider {
  public INFO(...args: any[]): void {
    getLogger().info(args);
  }

  public WARN(...args: any[]): void {
    getLogger().warn(args);
  }

  public ERROR(...args: any[]): void {
    getLogger().error(args);
  }
}
