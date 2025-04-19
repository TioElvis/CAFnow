export enum UserRole {
  SUPER = "super",
  ADMIN = "admin",
  MANAGER = "manager",
  EMPLOYEE = "employee",
  CLIENT = "client",
}

export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  role: UserRole;
  finger_print?: string;
  createdAt: Date;
  updateAt: Date;
}
