import { Confession } from '../../entities';

export const confessionStub = (): Confession => {
	return {
		ownerId: '1',
		content: 'test',
		created_at: undefined,
		updated_at: undefined,
		deleted_at: undefined
	};
};
