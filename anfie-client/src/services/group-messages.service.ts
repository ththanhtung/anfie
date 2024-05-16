import { ENDPOINT_APIS, HttpClient } from "./network";

export class GroupMessagesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListGroupMessagesByConversationId(
    params: TGroupMessageParams,
    groupId: string = ""
  ) {
    const { data } = await this.instance.get<TResultResponse<TGroupMessage[]>>(
      `${ENDPOINT_APIS.groupConversations.list}/${groupId}/messages`,
      { params }
    );
    return data;
  }

  public async postCreateGroupMessage(
    form: TGroupMessageForm,
    groupId: string = ""
  ) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.groupConversations.list}/${groupId}/messages`,
      form
    );
    return data;
  }
}

export const groupMessagesService = new GroupMessagesServiceApis();
