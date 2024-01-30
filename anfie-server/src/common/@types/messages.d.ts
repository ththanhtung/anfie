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
