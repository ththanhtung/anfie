import { ENDPOINT_APIS, HttpClient } from "./network";

export class MessageRequestServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListMessageRequests(
    params: TMessageRequestParams,
    MessageRequestId: string = ""
  ) {
    const { data } = await this.instance.get<
      TResultResponse<TMessageRequest[]>
    >(`${ENDPOINT_APIS.messageRequests.list}/${MessageRequestId}`, { params });
    return data;
  }

  public async postCreateMessageRequest(form: TMessageRequestForm) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.messageRequests.list}`,
      form
    );
    return data;
  }

  public async acceptRequest(requestId: string) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.messageRequests.list}/${requestId}/accept`
    );
    return data;
  }

  public async rejectRequest(requestId: string) {
    const { data } = await this.instance.patch(
      `${ENDPOINT_APIS.messageRequests.list}/${requestId}/reject` 
    );
    return data;
  }
}

export const messageRequestsService = new MessageRequestServiceApis();
