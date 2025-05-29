import { Uuid } from 'src/common/domain/value-object/uuid';
import { Interest } from 'src/user/domain/entities/interest';

export interface InterestsRepository {
  delete(interstId: Uuid): Promise<void>;

  save(domainObject: Interest): Promise<void>;

  findById(interestId: Uuid): Promise<Interest>;

  findAllByUserId(userId: Uuid): Promise<Interest[]>;
}
