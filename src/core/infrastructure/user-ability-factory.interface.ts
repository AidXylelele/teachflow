import { AnyAbility } from '@casl/ability';

export interface AbilityFactory {
  createForUser(user: unknown): AnyAbility;
}
