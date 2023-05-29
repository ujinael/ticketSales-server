export class PasswordChangeDto {
  constructor(
    public userId: string,
    public newPassword: string,
    public oldPassword: string,
  ) {}
}
