type TCreatePostParams = {
	authorId: string;
	content: string;
	groupId?: string;
	totalLikes: number;
};

type TPostMedia = {
	key: string;
	postId: string;
};

type TUploadPostMediaParams = {
	file: Express.Multer.File;
	postMedia: MessageMedia;
};
