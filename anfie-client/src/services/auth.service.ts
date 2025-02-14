import { ENDPOINT_APIS, HttpClient } from "./network";

export class AuthServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async postLoginUser(form: TFormLogin) {
    const { data } = await this.instance.post(ENDPOINT_APIS.auth.login, {
      ...form,
    });
    return data;
  }

  public async postSignupUser(form: FormData) {
    const { data } = await this.instance.postForm(
      ENDPOINT_APIS.auth.signup,
      form
    );
    return data;
  }

  public async patchChangePassword({
    previousPassword,
    newPassword,
  }: TFormChangePassword) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.auth.changePassword,
      {
        previousPassword,
        newPassword,
      }
    );
    return data;
  }
}

export const authService = new AuthServiceApis();
