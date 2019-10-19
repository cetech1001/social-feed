export interface User {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  status?: string;
}

export interface AuthResponse {
  error?: string;
  message?: string;
  user?: User;
}

export interface UserLoginDetails {
  username: string;
  password: string;
}

export interface Post {
  id?: number;
  user: string;
  body: string;
  likes: number;
}
