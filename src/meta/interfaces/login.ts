export interface AuthenticationSchema {
  email: string,
  password: string,
}

export interface LoginPayloadRequest extends AuthenticationSchema {}
