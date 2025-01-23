type TGroupConversationParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TGroupConversation = {
  id: string;
  created_at: string;
  updated_at: string;
  adminId: string;
  creatorId: string;
  lastMessageDate: any;
  creator: TUser;
  admin: TUser;
  lastMessage: TGroupMessage;
  avatar?: string;
  title: string;
  type: 'public' | 'private';
};
