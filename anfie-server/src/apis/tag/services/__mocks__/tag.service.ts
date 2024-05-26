import { TagStub } from '../../test/stubs';

export const TagService = jest.fn().mockReturnValue({
	create: jest.fn().mockResolvedValue(TagStub()),
	findAll: jest.fn().mockResolvedValue([TagStub()]),
	findOneById: jest.fn().mockResolvedValue(TagStub()),
	remove: jest.fn().mockResolvedValue(TagStub()),
	findByNames: jest.fn().mockResolvedValue([TagStub()])
});
