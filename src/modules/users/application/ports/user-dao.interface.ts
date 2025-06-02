import { UserModel } from '../../infrastructure/persistence/schemas/user.schema';

export interface IUserDao {
  findOneByEmail(email: string): Promise<UserModel | null>;
  findOneByIdOrFail(id: string): Promise<UserModel>;
  persist(domain: UserModel): Promise<void>;
}
