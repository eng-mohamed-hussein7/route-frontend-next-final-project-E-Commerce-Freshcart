export type ForgetPasswordResponse = {
  statusMsg: string;
  message: string;
};

export type VerifyResetCodeResponse = {
  status: string;
  statusMsg?: string;
  message?: string;
};

export type ResetPasswordResponse = {
  token?: string;
  statusMsg: string;
  message: string;
};