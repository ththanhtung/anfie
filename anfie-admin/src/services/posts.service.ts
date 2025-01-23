import { ENDPOINT_APIS, HttpClient } from "./network";

export class PostServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListPosts(groupId: string, params: TPostParams) {
    const { data } = await this.instance.get<TResultResponse<TPost[]>>(
      `${ENDPOINT_APIS.groups.list}/${groupId}/posts`,
      {
        params,
      }
    );
    return data;
  }

  public async postCreatePost(form: TPostForm) {
    const { data } = await this.instance.postForm(
      ENDPOINT_APIS.posts.list,
      form
    );
    return data;
  }
}

export const postService = new PostServiceApis();
