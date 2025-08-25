export interface CreateUsersInterface {
  statusCode: number;
  message: string;
  data: any;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponseInterface {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: any;
  message?: string;
  statusCode?: number;
}
