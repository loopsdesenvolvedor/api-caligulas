export type UserType = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};
export type Payload = {
  sub?: string;
  user_id?: string;
};

export type RecoverPasswordType = {
  email: string;
};

export type ResetPasswordType = {
  token: string;
  newPassword: string;
};

export type MessagePromisseType = {
  message?: string;
  error?: string;
};
