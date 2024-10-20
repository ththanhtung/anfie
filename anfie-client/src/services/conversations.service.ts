import { ENDPOINT_APIS, HttpClient } from "./network";

export class ConversationServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListConversations(params: TConversationParams) {
    const { data } = await this.instance.get<TResultResponse<TConversation[]>>(
      ENDPOINT_APIS.conversation.list,
      { params }
    );
    return data;
  }

  public async postLeaveConversation(id: string) {
    const { data } = await this.instance.delete<
      TResultResponse<TLeaveConversationResponse[]>
    >(`${ENDPOINT_APIS.conversation.list}/${id}`);
    return data;
  }
}

export const conversationService = new ConversationServiceApis();
