import ICryptProvider, { IDecrypt, IEncrypt } from '../models/ICryptProvider';
import bcrypt from 'bcrypt';
import cryptConfig from '@config/crypt';

export default class BcryptProvider implements ICryptProvider {
  encrypt({ data }: IEncrypt): string {
    console.log(cryptConfig.saltOrRounds, 'cryptConfig.saltOrRounds');
    return bcrypt.hashSync(data, cryptConfig.saltOrRounds);
  }
  decrypt({ data, encrypted }: IDecrypt): boolean {
    return bcrypt.compareSync(data, encrypted);
  }
}
