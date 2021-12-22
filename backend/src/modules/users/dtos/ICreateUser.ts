export default interface ICreateUser {
  email: string;
  password: string;
  name: string;
  phone: string;
  roleId: number;
  active: boolean;
}
