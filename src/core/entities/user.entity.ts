export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly password: string,
    public readonly emailVerified: boolean = false,
    public readonly iconUrl: string | null = null,
  ) { }

  withIconUrl(iconUrl: string | null): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.phone,
      this.password,
      this.emailVerified,
      iconUrl,
    );
  }
}