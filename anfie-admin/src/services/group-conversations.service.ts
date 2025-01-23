import { ENDPOINT_APIS, HttpClient } from "./network";

export class GroupConversationServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListGroupConversations(params: TGroupConversationParams) {
    const { data } = await this.instance.get<
      TResultResponse<TGroupConversation[]>
    >(ENDPOINT_APIS.groupConversations.list, { params });
    return data;
  }
}

export const groupConversationService = new GroupConversationServiceApis();
