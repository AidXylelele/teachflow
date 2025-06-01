import { RawRule } from '@casl/ability';

export type CaslRoles<T extends string = string> = Record<T, Array<RawRule>>;
