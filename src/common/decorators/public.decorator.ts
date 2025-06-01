import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = Symbol('IS_PUBLIC');

export const Public = (): CustomDecorator<typeof IS_PUBLIC_KEY> => {
  return SetMetadata(IS_PUBLIC_KEY, true);
};
