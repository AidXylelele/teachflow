import { AggregateRoot } from '@app/cqs';
import { Uuid } from 'src/common/value-objects/uuid';
import { Email } from '../value-objects/email';
import { Name } from '../value-objects/name';
import { Password } from '../value-objects/password';
import { Role, UserRole } from '../value-objects/role';

interface UserProps {
  email: Email;
  name: Name;
  password: Password;
  role: Role;
}

export class User extends AggregateRoot<Uuid, UserProps> {
  private constructor(id: Uuid, props: UserProps) {
    super(id, props);
  }

  public changeName(value: string): void {
    this.props.name = Name.create(value);
  }

  public changePassword(value: string): void {
    this.props.password = Password.create(value);
  }

  public changeRole(value: UserRole): void {
    this.props.role = Role.create(value);
  }

  public static create(props: UserProps): User {
    const id = Uuid.generate();
    return new User(id, props);
  }
}
