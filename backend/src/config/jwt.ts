interface IJwtConfig {
  token: string;
  refreshToken: string;
}
export default {
  token: process.env.JWT_TOKEN || '',
  refreshToken: process.env.JWT_REFRESH_TOKEN || '',
} as IJwtConfig;
