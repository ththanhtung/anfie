type TMessage = {
  content: string;
  userId: string;
  user: TUser;
  conversationId: number;
  groupId: null;
  id: number;
  created_at: string;
  updated_at: string;
  isSeen: boolean;
};

type TMessageParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TMessageForm = {
  content: string;
};

type TCreateMessageParams = {
  conversationId: string;
  form: TMessageForm;
  cb?: () => void;
};
