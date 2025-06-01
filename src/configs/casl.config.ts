import { CaslRoles } from 'libs/casl/interfaces';
import { UserRole } from 'src/modules/users/domain/value-objects/role';

const roles: CaslRoles<UserRole> = {
  [UserRole.ADMIN]: [],
  [UserRole.STUDENT]: [],
  [UserRole.MENTOR]: [],
  [UserRole.PUBLISHER]: [],
};

export default { roles };
