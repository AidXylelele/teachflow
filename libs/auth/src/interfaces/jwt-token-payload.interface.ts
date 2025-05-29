import { MongoQuery, RawRule } from '@casl/ability';
import { AbilityTupleType } from '@casl/ability/dist/types/types';
import { PackRule } from '@casl/ability/extra';
import { UUID } from 'crypto';

export interface JwtTokenPayload {
  id: UUID;
  rules: PackRule<RawRule<AbilityTupleType, MongoQuery>>[];
}
