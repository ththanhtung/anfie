import { ENDPOINT_APIS, HttpClient } from "./network";

export class GroupServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListGroups(params: TConversationParams) {
    const { data } = await this.instance.get<TResultResponse<TConversation[]>>(
      ENDPOINT_APIS.conversation.list,
      { params }
    );
    return data;
  }
}

export const conversationService = new GroupServiceApis();
