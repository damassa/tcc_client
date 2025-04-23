export class User {
  constructor(
    public uid: number,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
