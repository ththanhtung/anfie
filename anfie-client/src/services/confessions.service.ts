import { ENDPOINT_APIS, HttpClient } from "./network";

export class ConfessionsServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListConfessions(
    params: TConfessionParams,
    ConfessionId: string = ""
  ) {
    const { data } = await this.instance.get<TResultResponse<TConfession[]>>(
      `${ENDPOINT_APIS.confessions.list}/${ConfessionId}`,
      { params }
    );
    return data;
  }

  public async postCreateConfession(form: TConfessionForm) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.confessions.list}`,
      form
    );
    return data;
  }
}

export const confessionsService = new ConfessionsServiceApis();
