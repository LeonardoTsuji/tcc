interface IUpdateBudget {
  expiration_date: Date;
  payment_method: string;
  status: string;
  vehicle_id: number;
  user_id: number;
  schedule_id: number;
  id: number;
  products: ICreateBudgetProduct[];
}
