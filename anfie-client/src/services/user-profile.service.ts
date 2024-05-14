import { ENDPOINT_APIS, HttpClient } from "./network";

export class UserProfilesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getUserProfile() {
    const { data } = await this.instance.get(
      ENDPOINT_APIS.userProfiles.list + "/me"
    );
    return data;
  }

  public async patchUpdateUserProfile(form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.userProfiles.list + "/me",
      {
        ...form,
      }
    );
    return data;
  }
}

export const userProfilesService = new UserProfilesServiceApis();
