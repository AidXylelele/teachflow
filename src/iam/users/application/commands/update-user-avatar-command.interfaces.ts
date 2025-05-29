import { UUID } from 'crypto';

export interface UpdateUserAvatarCommandInput {
  entityId: UUID;
  fileKey: string;
}

export type updateUserAvatarCommandOutput = void;
