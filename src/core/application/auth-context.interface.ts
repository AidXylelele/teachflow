import { AnyAbility } from '@casl/ability';
import { Identity } from './identity.interface';

export interface AuthContext {
  identity: Identity;
  ability: AnyAbility;
}
