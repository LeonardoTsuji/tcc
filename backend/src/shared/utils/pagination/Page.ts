import IPageableParams from './IPageableParams';

class Page<T> {
  from: number;

  to: number;

  per_page: number;

  total: number;

  current_page: number;

  prev_page?: number | null;

  next_page?: number | null;

  data: T[];

  constructor({
    from,
    to,
    per_page,
    total,
    current_page,
    prev_page,
    next_page,
    data,
  }: IPageableParams<T>) {
    this.from = from;
    this.to = to;
    this.per_page = per_page;
    this.total = total;
    this.current_page = current_page;
    this.prev_page = prev_page;
    this.next_page = next_page;
    this.data = data;
  }
}

export default Page;
