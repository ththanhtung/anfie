type TMessage = {
  content: string;
  userId: string;
  user: TUser;
  conversationId: string;
  conversation: TConversation;
  groupId: null;
  id: string;
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
  form: FormData;
  cb?: () => void;
};
