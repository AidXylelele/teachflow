import { UUID } from 'crypto';
import { QueryResponse } from 'src/common/application/query/query-response';
import { Interest } from 'src/user/domain/entities/interest';

interface InterestPrimitives {
  id: UUID;
  categoryId: UUID;
}

export class FindCurrentUserInterestsResponse extends QueryResponse<
  InterestPrimitives[]
> {
  private constructor(interests: InterestPrimitives[]) {
    super(interests);
  }

  static from(interests: Interest[]): FindCurrentUserInterestsResponse {
    return new FindCurrentUserInterestsResponse(
      interests.map((item: Interest) => ({
        id: item.id.value,
        categoryId: item.categoryId.value,
      })),
    );
  }
}
