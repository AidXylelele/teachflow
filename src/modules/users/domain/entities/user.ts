import { AggregateRoot } from '@app/cqs';
import { Uuid } from 'src/core/domain/uuid';
import { Email } from '../value-objects/email';
import { Name } from '../value-objects/name';

interface CreateUserProps {
  email: Email;
  name: Name;
}

interface UserProps {
  email: Email;
  name: Name;
  version: number;
}

export class User extends AggregateRoot<Uuid, UserProps> {
  public constructor(id: Uuid, props: UserProps) {
    super(id, props);
  }

  public get email(): Email {
    return this.props.email;
  }

  public get name(): Name {
    return this.props.name;
  }

  public get version(): number {
    return this.props.version;
  }

  public changeName(value: string): void {
    this.props.name = Name.create(value);
  }

  public changeEmail(value: string): void {
    this.props.email = Email.create(value);
  }

  public static create(input: CreateUserProps): User {
    const id = Uuid.generate();

    const props = {
      ...input,
      version: 0,
    };

    return new User(id, props);
  }
}
