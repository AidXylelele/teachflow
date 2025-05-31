import { AggregateRoot } from '@app/cqs';
import { Uuid } from 'src/common/value-objects/uuid';
import { Email } from './email';
import { Name } from './name';
import { Password } from './password';
import { UUID } from 'crypto';

interface CreateUserProps {
  email: Email;
  name: Name;
  password: Password;
  roleId: Uuid;
}

export interface UserProps extends CreateUserProps {
  isActive: boolean;
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

  public changeRole(roleId: UUID): void {
    this.props.roleId = Uuid.create(roleId);
  }

  public blockAccount(): void {
    if (!this.props.isActive) return;

    this.props.isActive = false;
  }

  public unblockAccount(): void {
    if (this.props.isActive) return;

    this.props.isActive = true;
  }

  public static create(props: CreateUserProps): User {
    const id = Uuid.generate();
    return new User(id, { ...props, isActive: true });
  }
}
