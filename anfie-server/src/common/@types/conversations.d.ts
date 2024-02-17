type TUpdateLastMessageParams = {
	conversationId: number;
	messageId: number;
};

type TCreateConversationResponse = {
	id: number;
	created_at: string;
	updated_at: string;
	creatorId: number;
	recipientId: number;
	lastMessageId: number;
	lastMessage: TCreateMessageResponse;
	lastMessageDate: Date;
};

type TConversation = {
	id: number;
	created_at: string;
	updated_at: string;
	creatorId: number;
	recipientId: number;
	lastMessageId: number;
	lastMessage: TCreateMessageResponse;
	lastMessageDate: Date;
};
