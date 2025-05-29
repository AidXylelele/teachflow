import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UUID } from 'crypto';
import { Command } from 'src/common/application/command/command';
import { Query } from 'src/common/application/query/query';
import { COMMAND_TOKEN, QUERY_TOKEN } from 'src/common/di-tokens';
import { DomainIdDto } from 'src/common/interfaces/http/dtos/domain-id.dto';

import { ContactDto } from './dtos/contact/contact.dto';
import { CreateContactDto } from './dtos/contact/create-contact.dto';
import { SearchContactsParamsDto } from './dtos/contact/search-contacts-params.dto';
import { CreateInterestDto } from './dtos/interest/create-interest.dto';
import { InterestDto } from './dtos/interest/interest.dto';
import { SearchInterestsParamsDto } from './dtos/interest/search-interests-params.dto';
import { UpdateCurrentUserDto } from './dtos/user/update-current-user.dto';
import { UserDto } from './dtos/user/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    @Inject(COMMAND_TOKEN.CREATE_USER)
    private readonly createUserCommand: Command<void, DomainIdDto>,
    @Inject(COMMAND_TOKEN.UPDATE_CURRENT_USER)
    private readonly updateCurrentUserCommand: Command<
      UpdateCurrentUserDto,
      DomainIdDto
    >,
    @Inject(COMMAND_TOKEN.CREATE_INTEREST)
    private readonly createInterestCommand: Command<
      CreateInterestDto,
      DomainIdDto
    >,
    @Inject(COMMAND_TOKEN.CREATE_CONTACT)
    private readonly createContactCommand: Command<
      CreateContactDto,
      DomainIdDto
    >,
    @Inject(COMMAND_TOKEN.DELETE_INTEREST)
    private readonly deleteInterestCommand: Command<DomainIdDto, void>,
    @Inject(COMMAND_TOKEN.DELETE_CONTACT)
    private readonly deleteContactCommand: Command<DomainIdDto, void>,
    @Inject(QUERY_TOKEN.FIND_CURRENT_USER)
    private readonly findCurrentUserQuery: Query<void, UserDto>,
    @Inject(QUERY_TOKEN.FIND_CURRENT_USER_INTERESTS)
    private readonly findCurrentUserInterestsQuery: Query<
      SearchInterestsParamsDto,
      InterestDto[]
    >,
    @Inject(QUERY_TOKEN.FIND_CURRENT_USER_CONTACTS)
    private readonly findCurrentUserContactsQuery: Query<
      SearchContactsParamsDto,
      ContactDto[]
    >,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user account.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DomainIdDto,
  })
  @ApiConflictResponse({ description: 'Conflict.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async createUser(): Promise<DomainIdDto> {
    return this.createUserCommand.execute();
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get my account.' })
  @ApiOkResponse({ description: 'Successful request', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async getCurrenUser(): Promise<UserDto> {
    return this.findCurrentUserQuery.execute();
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update account.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: DomainIdDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async updateCurrentUser(
    @Body() input: UpdateCurrentUserDto,
  ): Promise<DomainIdDto> {
    return this.updateCurrentUserCommand.execute(input);
  }

  @Post('me/interests')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add interest.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DomainIdDto,
  })
  @ApiConflictResponse({ description: 'Conflict.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async createInterest(@Body() input: CreateInterestDto): Promise<DomainIdDto> {
    return this.createInterestCommand.execute(input);
  }

  @Get('me/interests')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get my interests.' })
  @ApiOkResponse({ description: 'Successful request', type: InterestDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async getCurrentUserInterests(): Promise<InterestDto[]> {
    return this.findCurrentUserInterestsQuery.execute({});
  }

  @Delete('me/interests/:interestId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    description: 'ID of the interest',
    format: 'uuid',
    name: 'interestId',
    type: String,
  })
  @ApiOperation({ summary: 'Delete interest.' })
  @ApiNoContentResponse({ description: 'Successful request.' })
  @ApiNotFoundResponse({ description: 'The record was not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async deleteInterest(@Param('interestId') interestId: UUID): Promise<void> {
    return this.deleteInterestCommand.execute({ id: interestId });
  }

  @Post('me/contacts')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add contact.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DomainIdDto,
  })
  @ApiConflictResponse({ description: 'Conflict.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async createContact(@Body() input: CreateContactDto): Promise<DomainIdDto> {
    return this.createContactCommand.execute(input);
  }

  @Get('me/contacts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get my contacts.' })
  @ApiOkResponse({ description: 'Successful request', type: ContactDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async getCurrentUserContacts(): Promise<ContactDto[]> {
    return this.findCurrentUserContactsQuery.execute({}); // TODO: add search params;
  }

  @Delete('me/contacts/:contactId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    description: 'ID of the contact',
    format: 'uuid',
    name: 'contactId',
    type: String,
  })
  @ApiOperation({ summary: 'Delete contact.' })
  @ApiNoContentResponse({ description: 'Successful request.' })
  @ApiNotFoundResponse({ description: 'The record was not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async deleteContact(@Param('contactId') contactId: UUID): Promise<void> {
    return this.deleteContactCommand.execute({ id: contactId });
  }

  @Post('me/followerships')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Follow user.' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DomainIdDto,
  })
  @ApiConflictResponse({ description: 'Conflict.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async createFollowership(
    @Body() input: CreateContactDto,
  ): Promise<DomainIdDto> {
    return this.createContactCommand.execute(input);
  }

  @Delete('me/followerships/:followershipId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    description: 'ID of the followership',
    format: 'uuid',
    name: 'followershipId',
    type: String,
  })
  @ApiOperation({ summary: 'Delete contact.' })
  @ApiNoContentResponse({ description: 'Successful request.' })
  @ApiNotFoundResponse({ description: 'The record was not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  async deleteFollowership(
    @Param('followershipId') contactId: UUID,
  ): Promise<void> {
    return this.deleteContactCommand.execute({ id: contactId });
  }
}
