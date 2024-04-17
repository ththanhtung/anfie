type TCreatePostParams = {
	authorId: number;
	content: string;
	groupId?: number;
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
