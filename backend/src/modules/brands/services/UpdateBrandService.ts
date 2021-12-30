import ILogProvider from '@shared/container/providers/LogProvider/models/ILogProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Brand from '../infra/typeorm/entities/Brand';
import IBrandRepository from '../repositories/IBrandRepository';

@injectable()
export default class UpdateBrandService {
  constructor(
    @inject('BrandRepository')
    private modelRepository: IBrandRepository,
    @inject('LogProvider')
    private log: ILogProvider,
  ) {}

  public async execute({ name, id }: IUpdateBrand): Promise<Brand | undefined> {
    try {
      const modelFound = await this.modelRepository.findById(id);

      if (!modelFound) throw new AppError('Brand not found!', 404);

      const modelUpdated = await this.modelRepository.update(modelFound.id, {
        name,
      });

      return modelUpdated;
    } catch (error: any) {
      this.log.ERROR(error);
      throw new AppError(error.message);
    }
  }
}
