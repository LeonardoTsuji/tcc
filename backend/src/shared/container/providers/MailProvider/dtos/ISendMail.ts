interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface ISendMailDTO {
  email: string;
  from?: string;
  subject: string;
  template: string;
  context: ITemplateVariables;
}
