type TUpdateLastMessageParams = {
	conversationId: string;
	messageId: string;
};

type TCreateConversationResponse = {
	id: string;
	created_at: string;
	updated_at: string;
	creatorId: string;
	recipientId: string;
	lastMessageId: string;
	lastMessage: TCreateMessageResponse;
	lastMessageDate: Date;
};

type TConversation = {
	id: string;
	created_at: string;
	updated_at: string;
	creatorId: string;
	recipientId: string;
	lastMessageId: string;
	lastMessage: TCreateMessageResponse;
	lastMessageDate: Date;
};
