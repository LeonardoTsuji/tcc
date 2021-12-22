/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ILogProvider {
  INFO(...args: any[]): void;
  WARN(...args: any[]): void;
  ERROR(...args: any[]): void;
}
