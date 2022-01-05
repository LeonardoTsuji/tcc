import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandRepository from '../repositories/IBrandRepository';

@injectable()
export default class CreateBrandService {
  constructor(
    @inject('BrandRepository')
    private brandRepository: IBrandRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ name }: ICreateBrand): Promise<Brand | undefined> {
    try {
      if (!name) {
        throw new AppError(
          'Incomplete data for creating a new brand, please validate and try again.',
        );
      }

      this.log.INFO({
        message: 'Init execute',
        params: {
          name,
        },
      });
      const hasBrand = await this.brandRepository.findOne(name);

      this.log.INFO({
        message: 'brandRepository.findOne',
        result: {
          user: JSON.stringify(hasBrand),
        },
      });

      if (hasBrand) {
        throw new AppError('Brand already exists');
      }

      const newBrand: Brand = await this.brandRepository.save({
        name,
      });

      this.log.INFO({
        message: 'brandRepository.save',
        result: {
          model: JSON.stringify(newBrand),
        },
      });

      return newBrand;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
