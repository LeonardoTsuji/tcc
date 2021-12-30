import mailConfig from '@config/mail';
import { container } from 'tsyringe';
import SendGridMailProvider from './implementations/SendGridMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  sendgrid: container.resolve(SendGridMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
