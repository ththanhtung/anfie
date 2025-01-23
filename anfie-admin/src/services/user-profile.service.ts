import { ENDPOINT_APIS, HttpClient } from "./network";

export class UserProfilesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getUserProfile() {
    const { data } = await this.instance.get<
      TResultResponse<TGetTUserProfileResponse>
    >(ENDPOINT_APIS.userProfiles.list + "/me");
    return data;
  }

  public async patchUpdateUserProfile(form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.users.list + "/me",
      {
        ...form,
      }
    );
    return data;
  }

  public async postFindNewFriends() {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.users.list}/find-new-friend`
    );
    return data;
  }
}

export const userProfilesService = new UserProfilesServiceApis();
