export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  token?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
