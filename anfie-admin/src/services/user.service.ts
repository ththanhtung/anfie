import { ENDPOINT_APIS, HttpClient } from "./network";

export class UserServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListUsers(params: TGetUsersParams) {
    const { data } = await this.instance.get<
      TResultResponse<TGetUsersAdminResponse[]>
    >(ENDPOINT_APIS.users.list, { params });
    return data;
  }
}

export const userService = new UserServiceApis();
