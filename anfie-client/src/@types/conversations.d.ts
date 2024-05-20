type TConversationParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TConversation = {
  id: string;
  created_at: string;
  updated_at: string;
  creatorId: string;
  recipientId: string;
  lastMessageDate: any;
  creator: TUser;
  recipient: TUser;
  lastMessage: TMessage;
};