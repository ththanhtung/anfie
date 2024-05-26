import { Tag } from '../../entities';

export const TagStub = (): Tag => {
	return {
		name: 'tag',
		created_at: undefined,
		updated_at: undefined,
		deleted_at: undefined
	};
};
