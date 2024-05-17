import { ENDPOINT_APIS, HttpClient } from "./network";

export class FriendServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListFriends(
    params: TFriendParams,
    FriendId: string = ""
  ) {
    const { data } = await this.instance.get<TResultResponse<TuserFriend[]>>(
      `${ENDPOINT_APIS.friends.list}/${FriendId}`,
      { params }
    );
    return data;
  }

  public async postCreateFriend(form: TFriendForm) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.friends.list}/admin`,
      form
    );
    return data;
  }
}

export const friendsService = new FriendServiceApis();
