import { CaslRoles } from './casl-roles.interface';

export interface CaslModuleOptions<> {
  global?: boolean;
  roles: CaslRoles;
}
