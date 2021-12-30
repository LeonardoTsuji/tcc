import ISendMail from '../dtos/ISendMail';
import IMailProvider from '../models/IMailProvider';

export default class SendGridMailProvider implements IMailProvider {
  send(data: ISendMail): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
