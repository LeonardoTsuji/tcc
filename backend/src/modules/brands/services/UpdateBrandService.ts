import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandRepository from '../repositories/IBrandRepository';

@injectable()
export default class UpdateBrandService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ name, id }: IUpdateBrand): Promise<Brand | undefined> {
    try {
      const brandFound = await this.brandRepository.findById(id);

      if (!brandFound) throw new AppError('Brand not found!', 404);

      const brandUpdated = await this.brandRepository.update(brandFound.id, {
        name,
      });

      return brandUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
