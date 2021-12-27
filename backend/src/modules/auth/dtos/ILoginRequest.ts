type GrantTypes = 'password' | 'refresh_token';

export default interface ILoginRequest {
  email?: string;
  password?: string;
  grant_type?: GrantTypes;
  refresh_token?: string;
}
