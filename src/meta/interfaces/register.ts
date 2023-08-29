export interface RegisterSchema {
  firstName: string,
  lastName: string,
  email: string
}

export interface RegisterPayloadRequest extends RegisterSchema {}

