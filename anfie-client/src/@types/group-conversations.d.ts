type TGroupConversationParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TGroupConversation = {
  id: number;
  created_at: string;
  updated_at: string;
  adminId: number;
  creatorId: number;
  lastMessageDate: any;
  creator: TUser;
  admin: TUser;
  lastMessage: TGroupMessage;
  avatar?: string;
  title: string;
};
