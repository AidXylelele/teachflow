export class AuthContextNotFoundException extends Error {
  public constructor() {
    super('Auth context not found');
  }
}
