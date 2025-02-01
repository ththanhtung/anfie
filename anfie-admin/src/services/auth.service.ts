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

  public async postSignupUser(form: TFormSignup) {
    const { data } = await this.instance.post(ENDPOINT_APIS.auth.signup, {
      ...form,
    });
    return data;
  }

  public async postLoginAdmin(form: TFormLogin) {
    const { data } = await this.instance.post(ENDPOINT_APIS.auth.admin.login, {
      ...form,
    });

    console.log({ data }); 
    
    return data;
  }
}

export const authService = new AuthServiceApis();
