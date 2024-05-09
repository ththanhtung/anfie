import { ENDPOINT_APIS, HttpClient } from "./network";

export class GroupsServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListGroups(params: TGroupParams) {
    const { data } = await this.instance.get<TResultResponse<TGroup[]>>(
      `${ENDPOINT_APIS.groups.list}`,
      { params }
    );
    return data;
  }

  public async postCreateGroup(form: TGroupForm) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.groups.list}`,
      form
    );
    return data;
  }

  public async patchUpdateGroup(noteId: string, form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.groups.list + "/" + noteId,
      {
        ...form,
      }
    );
    return data;
  }
}

export const groupsService = new GroupsServiceApis();
