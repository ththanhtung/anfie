type TConversationParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TConversation = {
  id: number;
  created_at: string;
  updated_at: string;
  creatorId: number;
  recipientId: number;
  lastMessageDate: any;
  creator: TCreator;
  recipient: TRecipient;
  lastMessage: TMessage;
};

type TCreator = {
  id: string
  created_at: string
  updated_at: string
  email: string
}

type TRecipient = {
  id: string
  created_at: string
  updated_at: string
  email: string
}