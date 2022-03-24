export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  message?: string;
  photoURL?: string;
  lastLoginAt?: Date;
}
