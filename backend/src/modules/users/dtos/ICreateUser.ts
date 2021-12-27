export default interface ICreateUser {
  email: string;
  password: string;
  name: string;
  phone: string;
  role_id: number;
  active: boolean;
}
