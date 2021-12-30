import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandRepository from '../repositories/IBrandRepository';

@injectable()
export default class DeleteBrandService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute(id: number): Promise<Brand | undefined> {
    try {
      const brandFound = await this.brandRepository.findById(id);

      if (!brandFound) throw new AppError('Brand not found!', 404);

      const brandDeleted = await this.brandRepository.delete(brandFound.id);

      return brandDeleted;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
