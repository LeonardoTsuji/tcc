import { container } from 'tsyringe';
import cryptConfig from '@config/crypt';

import ICryptProvider from './models/ICryptProvider';
import BcryptProvider from './implementations/BcryptProvider';

const providers = {
  bcrypt: BcryptProvider,
};

container.register<ICryptProvider>(
  'CryptProvider',
  providers[cryptConfig.driver],
);
