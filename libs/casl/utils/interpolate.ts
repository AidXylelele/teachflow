import { render } from 'mustache';

export const interpolate = <T extends object>(
  template: T,
  data: unknown,
): T => {
  const stringified = JSON.stringify(template);
  return JSON.parse(stringified, (_key: string, value: unknown) => {
    if (typeof value !== 'string') return value;

    return render(value, data);
  }) as T;
};
