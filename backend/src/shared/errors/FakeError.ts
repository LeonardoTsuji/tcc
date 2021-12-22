/* eslint-disable @typescript-eslint/no-explicit-any */
interface IFakeError {
  status: number;
  data: {
    [key: string]: any;
  };
}
export default class FakeError {
  public readonly response: IFakeError;

  constructor(response: IFakeError) {
    this.response = response;
  }
}
