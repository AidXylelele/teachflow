import { AnyAbility } from '@casl/ability';
import { UUID } from 'node:crypto';

export interface AuthContext {
  id: UUID;
  ability: AnyAbility;
}
