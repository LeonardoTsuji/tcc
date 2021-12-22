declare namespace Express {
  export interface Request {
    user: {
      name: string;
      email: string;
      email_verified: boolean;
      usuario_id: number;
      frotista_id: number;
      realm_access: {
        roles: string[];
      };
      resource_access: {
        account: {
          roles: string[];
        };
      };
    };
  }
}
