import { ENDPOINT_APIS, HttpClient } from "./network";

export class ConversationRequestServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async acceptRequest(requestId: string) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.conversationRequest.list}/${requestId}/accept`
    );
    return data;
  }

  public async rejectRequest(requestId: string) {
    const { data } = await this.instance.patch(
      `${ENDPOINT_APIS.conversationRequest.list}/${requestId}/reject`
    );
    return data;
  }
}

export const conversationRequestService = new ConversationRequestServiceApis();
