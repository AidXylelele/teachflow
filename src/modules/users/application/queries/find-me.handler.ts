import { QueryHandler } from '@app/cqs';
import { FindMeQuery } from './find-me.query';
import { IQueryHandler } from '@app/cqs/interfaces/query-handler.interface';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { CLS_SERVICE } from '@app/cls';
import { IClsService } from 'src/core/infrastructure/cls-service.interface';
import { AUTH_CONTEXT_KEY } from 'src/common/constants/casl';
import { AuthContext } from 'src/core/application/auth-context.interface';
import { UserModel } from '../../infrastructure/persistence/schemas/user.schema';
import { USER_DAO } from '../../user.di-tokens';
import { IUserDao } from '../ports/user-dao.interface';

@QueryHandler(FindMeQuery)
export class FindMeQueryHandler implements IQueryHandler<FindMeQuery> {
  public constructor(
    @Inject(CLS_SERVICE) private readonly clsService: IClsService,
    @Inject(USER_DAO) private readonly userDao: IUserDao,
  ) {}

  public async execute(_query: FindMeQuery): Promise<UserModel> {
    const context = this.clsService.get<AuthContext>(AUTH_CONTEXT_KEY);

    if (!context) throw new UnauthorizedException();

    return await this.userDao.findOneByIdOrFail(context.identity.id);
  }
}
