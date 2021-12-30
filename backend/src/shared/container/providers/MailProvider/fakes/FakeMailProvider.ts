import IMailProvider from '../models/IMailProvider';
import ISendMail from '../dtos/ISendMail';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMail[] = [];

  public async send(message: ISendMail): Promise<void> {
    this.messages.push(message);
  }
}
