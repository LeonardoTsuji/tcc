interface ICryptConfig {
  driver: 'bcrypt';
  saltOrRounds: string;
}
export default {
  driver: process.env.CRYPT_DRIVER || 'bcrypt',
  saltOrRounds: process.env.CRYPT_SALT_OR_ROUNDS || 10,
} as ICryptConfig;
