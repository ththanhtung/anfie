type TPostParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TPost = {
  content: string;
  authorId: string;
  totalLikes: number;
  groupId: string;
  id: string;
  author: TUser;
  medias: TPostMedias[];
  created_at: string;
  updated_at: string;
};

type TPostForm = {
  content: string;
};

type TCreatePostParams = {
  form: any;
  cb?: () => void;
};

type TPostMedias = {
  id: string;
  created_at: string;
  updated_at: string;
  key: string;
  postId: string;
  url: any;
};

type TDeletePostParams = {
  postId: string;
  cb?: () => void;
};