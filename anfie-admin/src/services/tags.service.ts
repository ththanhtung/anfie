import { ENDPOINT_APIS, HttpClient } from "./network";

export class TagsServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListTags(params: TTagParams) {
    const { data } = await this.instance.get<TResultResponse<TTag[]>>(
      `${ENDPOINT_APIS.tags.list}`,
      { params }
    );
    return data;
  }

  public async postCreateTag(form: TTagForm) {
    const { data } = await this.instance.post(ENDPOINT_APIS.tags.list, form);
    return data;
  }

  public async patchUpdateTag(tagId: string, form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.tags.list + "/" + tagId,
      {
        ...form,
      }
    );
    return data;
  }
}

export const tagsService = new TagsServiceApis();
