import { UUID } from 'crypto';

export type CreateUserCommandInput = never;

export interface CreateUserCommandOutput {
  id: UUID;
}
