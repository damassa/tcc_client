export class UserResponse {
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

export class UserUpdate {
  constructor(
    public name: string,
    public email: string,
    public newPassword: string | undefined,
  ) {
    this.name = name;
    this.email = email;
    this.newPassword = newPassword;
  }
}
