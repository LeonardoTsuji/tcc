import { container } from 'tsyringe';

import JsonWebTokenProvider from './implementations/JsonWebTokenProvider';
import IJwtProvider from './models/IJwtProvider';

container.register<IJwtProvider>('JwtProvider', JsonWebTokenProvider);
