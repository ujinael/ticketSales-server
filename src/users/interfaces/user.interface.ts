export interface IUser {
  passwordHash: string;
  login: string;
  email: string;
  loyalityCardNumber?: string;
  id?: string;
}
