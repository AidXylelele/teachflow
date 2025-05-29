import { Email } from 'src/common/domain/value-object/email';

import { Preverified } from '../../domain/entities/preverified';

export interface PreverifiedRepository {
  exists(email: Email): Promise<boolean>;

  save(domainObject: Preverified): Promise<void>;
}
