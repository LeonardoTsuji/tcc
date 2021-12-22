/* eslint-disable @typescript-eslint/no-explicit-any */
import Debug from 'debug';
import ILogProvider from '../models/ILogProvider';

const log = Debug('api:FakeLogProvider');

export default class FakeLogProvider implements ILogProvider {
  public INFO(...args: any[]): void {
    log(args);
  }

  public WARN(...args: any[]): void {
    log(args);
  }

  public ERROR(...args: any[]): void {
    log(args);
  }
}
