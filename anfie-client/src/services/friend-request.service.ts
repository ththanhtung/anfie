import { ENDPOINT_APIS, HttpClient } from "./network";

export class FriendRequestServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListFriendRequests(
    params: TFriendRequestParams,
    FriendRequestId: string = ""
  ) {
    const { data } = await this.instance.get<
      TResultResponse<TFriendRequest[]>
    >(`${ENDPOINT_APIS.friendRequests.list}/${FriendRequestId}`, { params });
    return data;
  }

  public async postCreateFriendRequest(form: TFriendRequestForm) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.friendRequests.list}`,
      form
    );
    return data;
  }

  public async acceptRequest(requestId: string) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.friendRequests.list}/${requestId}/accept`
    );
    return data;
  }

  public async rejectRequest(requestId: string) {
    const { data } = await this.instance.patch(
      `${ENDPOINT_APIS.friendRequests.list}/${requestId}/reject` 
    );
    return data;
  }
}

export const friendRequestsService = new FriendRequestServiceApis();
