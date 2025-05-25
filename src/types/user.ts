export class UserResponse {
  constructor(
    public uid: number,
    public name: string,
    public email: string,
    public emailConfirmed: boolean,
    public senha: string,
    public role: string[],
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.emailConfirmed = emailConfirmed;
    this.senha = senha;
    this.role = role;
  }
}
