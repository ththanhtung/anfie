type TLoginResponse = {
  user: TUser;
  tokens: TTokens;
};

type TSignupResponse = {
  user: TUser;
}

type TUserInfo = {
  userId: string;
  email: string;
};

type TTokens = {
  accessToken: string;
};

type TFormLogin = {
  email: string;
  password: string;
};

type TFormSignup = {
  email: string;
  hash: string;
  lastName: string;
  firstName: string;
  dob: string;
  gender: string;
  phone: string;
  preferences?: string[];
  preferGenders?: string[];
  locations?: string[];
  preferGenders?: string[];
};

type TFormChangePassword = {
  previousPassword: string;
  newPassword: string;
};