import { Tag } from 'src/apis/tag/entities';

type TCreateConfession = {
	ownerId: string;
	content: string;
	tags: Tag[];
};

type TMessageRequestStatus = 'accepted' | 'pending' | 'rejected';
