import { Query } from '@app/cqs';
import { UserModel } from '../../infrastructure/persistence/schemas/user.schema';

export class FindMeQuery extends Query<UserModel> {}
