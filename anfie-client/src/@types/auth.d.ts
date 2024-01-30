type TLoginResponse = {
  user: TUser;
  tokens: TTokens;
};

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
