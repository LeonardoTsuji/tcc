export interface IEncrypt {
  data: string;
}
export interface IDecrypt {
  data: string;
  encrypted: string;
}

export default interface ICryptProvider {
  encrypt({ data }: IEncrypt): string;
  decrypt({ data, encrypted }: IDecrypt): boolean;
}
