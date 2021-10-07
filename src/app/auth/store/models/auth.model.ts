export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IsAdmin {
  isAdmin: boolean;
}
