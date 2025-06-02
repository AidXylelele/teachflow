import { AggregateRoot } from '@app/cqs';
import { Tag } from '../value-objects/tag';
import { Title } from '../value-objects/title';
import { Uuid } from 'src/core/domain/uuid';

interface CreateCourseProps {
  title: Title;
  tags: Tag[];
}

interface CourseProps {
  title: Title;
  tags: Tag[];
  isPublished: boolean;
  version: number;
}

export class User extends AggregateRoot<Uuid, CourseProps> {
  public constructor(id: Uuid, props: CourseProps) {
    super(id, props);
  }

  public get title(): Title {
    return this.props.title;
  }

  public get tags(): Tag[] {
    return this.props.tags;
  }

  public get version(): number {
    return this.props.version;
  }

  public static create(input: CreateCourseProps): Course {
    const props = {
      title: input.title,
      tags: 
      version: 0,
    };

    return new User(input.id, props);
  }
}
