type TConversationParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TConversation = {
  id: number;
  created_at: string;
  updated_at: string;
  creatorId: number;
  recipientId: number;
  lastMessageDate: any;
  creator: TUser;
  recipient: TUser;
  lastMessage: TMessage;
};