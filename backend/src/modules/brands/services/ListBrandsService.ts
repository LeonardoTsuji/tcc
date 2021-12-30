import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandRepository from '../repositories/IBrandRepository';

@injectable()
export default class ListBrandsService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ name }: IFindAllBrand): Promise<Brand[] | undefined> {
    try {
      return this.brandRepository.findAll({ name });
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
