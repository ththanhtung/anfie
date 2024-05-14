import { ENDPOINT_APIS, HttpClient } from "./network";

export class PreferencesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListPreferences(params: TPreferenceParams) {
    const { data } = await this.instance.get<TResultResponse<TPreference[]>>(
      `${ENDPOINT_APIS.preferences.list}`,
      { params }
    );
    return data;
  }

  public async postCreatePreference(form: TPreferenceForm) {
    const { data } = await this.instance.post(ENDPOINT_APIS.preferences.list, form);
    return data;
  }

  public async patchUpdatePreference(preferenceId: string, form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.preferences.list + "/" + preferenceId,
      {
        ...form,
      }
    );
    return data;
  }
}

export const preferencesService = new PreferencesServiceApis();
