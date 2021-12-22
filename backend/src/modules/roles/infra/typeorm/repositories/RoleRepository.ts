import IRoleRepository from '@modules/roles/repositories/IRoleRepository';
import { DeepPartial, getRepository, Like, Repository } from 'typeorm';
import Role from '../entitites/Role';

export default class RoleRepository implements IRoleRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }

  public async create(role: Role): Promise<Role> {
    const newUsuario = this.ormRepository.create(role);
    await this.ormRepository.save(newUsuario);
    return newUsuario;
  }

  public async findAll(): Promise<Role[]> {
    return this.ormRepository.find();
  }

  public async findById(id: number): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ id });
    return role;
  }

  async update(id: number, partial: DeepPartial<Role>): Promise<Role> {
    const role = await this.findById(id);
    if (!role) {
      throw new Error('Role não encontrada');
    }

    const roleToSave = this.ormRepository.merge(role, partial);
    return this.ormRepository.save(roleToSave);
  }

  public async delete(id: number): Promise<void> {
    const role = await this.findById(id);
    if (!role) {
      throw new Error('Role não encontrado');
    }

    await this.ormRepository.remove(role);
  }
}
