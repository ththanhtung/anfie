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
