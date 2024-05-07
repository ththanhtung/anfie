import { ENDPOINT_APIS, HttpClient } from "./network";

export class PostServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListPosts(params: TPostParams) {
    const { data } = await this.instance.get<TResultResponse<TPost[]>>(
      `${ENDPOINT_APIS.posts.list}`,
      {
        params,
      }
    );
    return data;
  }

  public async postCreatePost(form: TPostForm) {
    const { data } = await this.instance.postForm(ENDPOINT_APIS.posts.list, form);
    return data;
  }
}

export const postService = new PostServiceApis();
