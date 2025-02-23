import { ENDPOINT_APIS, HttpClient } from "./network";

export class UserProfilesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getUserProfile(id: string) {
    const { data } = await this.instance.get<
      TResultResponse<TGetTUserProfileResponse>
    >(`${ENDPOINT_APIS.userProfiles.admin.list}/${id}`);
    return data;
  }

  public async patchUpdateUserProfile(form: any, userId: string) {
    const { data } = await this.instance.patch(
      `${ENDPOINT_APIS.userProfiles.admin.list}/${userId}`,
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

  public async getUserProfileById(id: string) {
    const { data } = await this.instance.get<
      TResultResponse<TGetTUserProfileResponse>
    >(`${ENDPOINT_APIS.userProfiles.admin.list}/${id}`);
    return data;
  }
}

export const userProfilesService = new UserProfilesServiceApis();
