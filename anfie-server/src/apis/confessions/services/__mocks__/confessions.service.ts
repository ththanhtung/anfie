import { confessionStub } from '../../test';

export const ConfessionsService = jest.fn().mockReturnValue({
	createOne: jest.fn().mockResolvedValue(confessionStub()),
	getConfestionsRandom: jest.fn().mockResolvedValue([confessionStub()]),
	findOneById: jest.fn().mockResolvedValue(confessionStub()),
	getConfessions: jest.fn().mockResolvedValue([confessionStub()])
});
