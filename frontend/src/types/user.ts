export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserData {
  name: string;
  email: string;
  role: string;
}