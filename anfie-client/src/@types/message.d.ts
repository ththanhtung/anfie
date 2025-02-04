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
  medias: TMessageMedias[];
};

type TMessageParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TMessageForm = {
  content: string;
  medias?: any;
};

type TCreateMessageParams = {
  conversationId: string;
  form: FormData;
  cb?: () => void;
};

type TMessageMedias = {
  id: string;
  created_at: string;
  updated_at: string;
  key: string;
  messageId: string;
  url: any;
};
