interface ICryptConfig {
  driver: 'bcrypt';
  saltOrRounds: string | number;
}
export default {
  driver: process.env.CRYPT_DRIVER || 'bcrypt',
  saltOrRounds: Number(process.env.CRYPT_SALT_OR_ROUNDS) || 10,
} as ICryptConfig;
