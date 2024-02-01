import { ENDPOINT_APIS, HttpClient } from "./network";

export class MessagesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListMessagesByConversationId(
    params: TMessageParams,
    conversationId: string
  ) {
    const { data } = await this.instance.get(
      `${ENDPOINT_APIS.conversation.list}/${conversationId}/messages`,
      { params }
    );
    return data;
  }
}

export const messagesService = new MessagesServiceApis();
