type TComment = {
  content: string;
  parentId?: string;
  commentLeft: number;
  commentRight: number;
  userId: string;
  postId: string;
  id: string;
  user: TUser;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

type TCommentForm = {
  postId: string;
  content: string;
  parentId?: string | null | undefined;
};

type TCreateCommentParams = {
  form: TCommentForm;
  cb?: (data: any) => void;
};

type TGetComnentsParams = {
  page: number;
  limit: number;
  order_by: string;
  sort: TSort;
};
