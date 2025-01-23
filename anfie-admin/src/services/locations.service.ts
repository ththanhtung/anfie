import { ENDPOINT_APIS, HttpClient } from "./network";

export class LocationsServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListLocations(params: TLocationParams) {
    const { data } = await this.instance.get<TResultResponse<TLocation[]>>(
      `${ENDPOINT_APIS.locations.list}`,
      { params }
    );
    return data;
  }

  public async postCreateLocation(form: TLocationForm) {
    const { data } = await this.instance.post(ENDPOINT_APIS.locations.list, form);
    return data;
  }

  public async patchUpdateLocation(locationId: string, form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.locations.list + "/" + locationId,
      {
        ...form,
      }
    );
    return data;
  }
}

export const locationsService = new LocationsServiceApis();
