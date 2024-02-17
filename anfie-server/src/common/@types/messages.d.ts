type TCreateMessageParams = {
	userId: number;
	conversationId: number;
	content: string;
	medias?: Express.Multer.File[];
};

type TUpdateMessageMediaParams = {
	file: Express.Multer.File;
	messageMedia: MessageMedia;
};

type TMessage = {
	id: number;
	content: string;
	userId: number;
	conversationId: number;
	groupId: any;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	isSeen: boolean;
	medias: MessageMedia[];
};

type TCreateMessageResponse = {
	content: string;
	userId: number;
	conversationId: number;
	conversation: TCreateConversationResponse;
	groupId: any;
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	isSeen: boolean;
};
