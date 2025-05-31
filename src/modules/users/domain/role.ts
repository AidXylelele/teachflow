import { Uuid } from 'src/common/value-objects/uuid';
import { Permission, PermissionProps } from './permission';
import { Title } from './title';
import { Entity } from 'src/core/classes/entity';

export interface RoleProps {
  title: Title;
  permissions: Permission[];
}

export class Role extends Entity<Uuid, RoleProps> {
  private constructor(id: Uuid, props: RoleProps) {
    super(id, props);
  }

  public changeTitle(value: string): void {
    this.props.title = Title.create(value);
  }

  public changePermissions(values: PermissionProps[]): void {
    this.props.permissions = values.map((e) => Permission.create(e));
  }

  public static create(props: RoleProps): Role {
    const id = Uuid.generate();
    return new Role(id, props);
  }
}
