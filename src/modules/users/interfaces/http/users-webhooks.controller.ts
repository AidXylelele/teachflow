import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserCreatedEventDto } from './dtos/user-created-event.dto';
import { COMMAND_DISPATCHER } from '@app/cqs';
import { ICommandDispatcher } from 'src/core/infrastructure/command-dispatcher.interface';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { SignatureGuard } from 'src/common/guards/signature-auth.guard';
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller({ path: 'webhooks/users', version: '1' })
export class UsersWebhooksController {
  public constructor(
    @Inject(COMMAND_DISPATCHER)
    private readonly commandDispatcher: ICommandDispatcher,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Handles user created event',
    description: 'Receives an event when a new user is created. ',
  })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(SignatureGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async handlerUserCreatedEvent(
    @Body() body: UserCreatedEventDto,
  ): Promise<void> {
    return this.commandDispatcher.execute(
      new CreateUserCommand(body.id, body.email, body.name),
    );
  }
}
