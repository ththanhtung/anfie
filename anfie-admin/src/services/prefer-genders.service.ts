import { ENDPOINT_APIS, HttpClient } from "./network";

export class PreferGendersServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListPreferGenders(params: TPreferGenderParams) {
    const { data } = await this.instance.get<TResultResponse<TPreferGender[]>>(
      `${ENDPOINT_APIS.preferGenders.list}`,
      { params }
    );
    return data;
  }

  public async postCreatePreferGender(form: TPreferGenderForm) {
    const { data } = await this.instance.post(ENDPOINT_APIS.preferGenders.list, form);
    return data;
  }

  public async patchUpdatePreferGender(preferGenderId: string, form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.preferGenders.list + "/" + preferGenderId,
      {
        ...form,
      }
    );
    return data;
  }
}

export const preferGendersService = new PreferGendersServiceApis();
