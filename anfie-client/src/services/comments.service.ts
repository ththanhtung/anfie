import { ENDPOINT_APIS, HttpClient } from "./network";

export class CommentsServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getFirstComment() {
    const { data } = await this.instance.get<TResultResponse<TComment>>(
      `${ENDPOINT_APIS.comments.list}`
    );
    return data;
  }

  public async getCommentsByParentId(id: string, params: TGetComnentsParams) {
    const { data } = await this.instance.get<TResultResponse<TComment[]>>(
      `${ENDPOINT_APIS.comments.list}/${id}/children`,
      {
        params,
      }
    );
    return data;
  }

  public async postCreateComment(form: TCommentForm) {
    const { data } = await this.instance.post(
      ENDPOINT_APIS.comments.list,
      form
    );
    return data;
  }

  public async getDetailsComment(id: string) {
    const { data } = await this.instance.get<TResultResponse<TComment>>(
      `${ENDPOINT_APIS.comments.list}/${id}`
    );
    return data;
  }
}

export const commentsService = new CommentsServiceApis();
