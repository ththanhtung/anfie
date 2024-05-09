import { ENDPOINT_APIS, HttpClient } from "./network";

export class MessageRequestServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListMessageRequest(
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
}

export const messageRequestsService = new MessageRequestServiceApis();
