interface IMail {
  title: string;
  subtitle: string;
  subject: string;
  template: string;
}

interface IMailConfig {
  driver: 'sendgrid';
  validated_user: IMail;
  forgot_password: IMail;
  budget: IMail;
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'sendgrid',
  validated_user: {
    title: 'Premium Car Bauru',
    subtitle: '',
    subject:
      process.env.NODE_ENV === 'production'
        ? 'Boas vindas'
        : 'Ambiente de Teste - Boas vindas',
    template: 'boas-vindas',
  },
  forgot_password: {
    title: 'Premium Car Bauru',
    subject:
      process.env.NODE_ENV === 'production'
        ? 'Ambiente de Teste - Senha temporária'
        : 'Senha temporária',
    template: 'login',
    subtitle: '',
  },
  budget: {
    title: 'Premium Car Bauru',
    subject:
      process.env.NODE_ENV === 'production'
        ? 'Ambiente de Teste - Seu orçamento está disponível'
        : 'Seu orçamento está disponível',
    template: 'orcamento',
    subtitle: '',
  },
} as IMailConfig;
