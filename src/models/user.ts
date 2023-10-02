export interface User {
  firstname: string,
  lastname: string,
  displayName?: string,
  username?: string,
  token: string;
}

export interface UserFromValues {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  username: string,
}
