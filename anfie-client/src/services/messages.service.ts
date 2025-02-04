import { ENDPOINT_APIS, HttpClient } from "./network";

export class MessagesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListMessagesByConversationId(
    params: TMessageParams,
    conversationId: string = ""
  ) {
    const { data } = await this.instance.get<TResultResponse<TMessage[]>>(
      `${ENDPOINT_APIS.conversation.list}/${conversationId}/messages`,
      { params }
    );
    return data;
  }

  public async postCreateMessage(
    form: FormData,
    conversationId: string = ""
  ) {
    const { data } = await this.instance.postForm(
      `${ENDPOINT_APIS.conversation.list}/${conversationId}/messages`,
      form
    );
    return data;
  }
}

export const messagesService = new MessagesServiceApis();
