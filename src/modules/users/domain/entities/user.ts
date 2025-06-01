import { AggregateRoot } from '@app/cqs';
import { Uuid } from 'src/core/domain/uuid';
import { Email } from '../value-objects/email';
import { Name } from '../value-objects/name';
import { Password } from '../value-objects/password';
import { Role, UserRole } from '../value-objects/role';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials-exception';

interface CreateUserProps {
  email: Email;
  name: Name;
  password: Password;
  role: Role;
}

interface UserProps {
  email: Email;
  name: Name;
  password: Password;
  role: Role;
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

  public get role(): Role {
    return this.props.role;
  }

  public get password(): Password {
    return this.props.password;
  }

  public get version(): number {
    return this.props.version;
  }

  public checkPassword(hash: string): void {
    const input = Password.create(hash);

    if (!this.props.password.equals(input)) {
      throw new InvalidCredentialsException();
    }
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

  public static create(input: CreateUserProps): User {
    const id = Uuid.generate();

    const props = {
      ...input,
      version: 0,
    };

    return new User(id, props);
  }
}
