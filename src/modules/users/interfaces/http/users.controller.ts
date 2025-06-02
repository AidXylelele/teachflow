import { QUERY_DISPATCHER } from '@app/cqs';
import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { IQueryDispatcher } from 'src/core/infrastructure/query-dispatcher.interface';
import { UserResponseDto } from './dtos/user-response.dto';
import { FindMeQuery } from '../../application/queries/find-me.query';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller({ path: '/users', version: '1' })
export class UsersController {
  public constructor(
    @Inject(QUERY_DISPATCHER)
    private readonly queryDispatcher: IQueryDispatcher,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create user account.' })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: UserResponseDto })
  @ApiInternalServerErrorResponse()
  public async findMe(): Promise<UserResponseDto> {
    return this.queryDispatcher.execute(new FindMeQuery());
  }
}
