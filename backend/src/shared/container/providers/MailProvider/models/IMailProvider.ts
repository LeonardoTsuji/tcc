import ISendMail from '../dtos/ISendMail';

export default interface IMailProvider {
  send(data: ISendMail): Promise<void>;
}
