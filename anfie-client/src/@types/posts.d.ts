type TPostParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TPost = {
  content: string;
  authorId: number;
  totalLikes: number;
  groupId: any;
  id: number;
  created_at: string;
  updated_at: string;
}
