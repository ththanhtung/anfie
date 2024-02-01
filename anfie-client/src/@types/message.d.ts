type TMessage = {
  content: string;
  userId: number;
  conversationId: number;
  groupId: null;
  id: number;
  created_at: Date;
  updated_at: Date;
  isSeen: boolean;
};

type TMessageParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};
