import { ENDPOINT_APIS, HttpClient } from "./network";

export class AlleysServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getFirstAlley() {
    const { data } = await this.instance.get<TResultResponse<TAlley>>(
      `${ENDPOINT_APIS.alleys.list}`
    );
    return data;
  }

  public async getAlleyByParentId(id: string) {
    const { data } = await this.instance.get<TResultResponse<TAlley[]>>(
      `${ENDPOINT_APIS.alleys.list}/${id}/children`
    );
    return data;
  }

  public async postCreateAlley(form: TAlleyForm) {
    const { data } = await this.instance.post(ENDPOINT_APIS.alleys.list, form);
    return data;
  }

  public async getGroupByAlleyId(id: string) {
    const { data } = await this.instance.get<TResultResponse<TGroup>>(
      `${ENDPOINT_APIS.alleys.list}/${id}/groups`
    );
    return data;
  }

  public async getDetailsAlley(id: string) {
    const { data } = await this.instance.get<TResultResponse<TAlley>>(
      `${ENDPOINT_APIS.alleys.list}/${id}`
    );
    return data;
  }
}

export const alleysService = new AlleysServiceApis();
