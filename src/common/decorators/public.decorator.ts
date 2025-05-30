import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants/metadata-keys';

export const Public = (): CustomDecorator<typeof IS_PUBLIC_KEY> => {
  return SetMetadata(IS_PUBLIC_KEY, true);
};
