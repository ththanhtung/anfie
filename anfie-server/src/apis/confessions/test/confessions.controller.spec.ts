import { Test } from '@nestjs/testing';
import { ConfessionsController } from '../confessions.controller';
import { ConfessionsService } from '../services';
import { Confession } from '../entities';
import { confessionStub } from './stubs';
import { CreateConfestionDto } from '../dto';

jest.mock('../services/confessions.service');

describe('ConfessionsController', () => {
	let confessionController: ConfessionsController;
	let confessionsService: ConfessionsService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [],
			controllers: [ConfessionsController],
			providers: [ConfessionsService]
		}).compile();

		confessionController = moduleRef.get<ConfessionsController>(ConfessionsController);
		confessionsService = moduleRef.get<ConfessionsService>(ConfessionsService);
		jest.clearAllMocks();
	});

	describe('createOne', () => {
		describe('when createOne is called', () => {
			let confession: Confession;
			let confessionDto: CreateConfestionDto;

			beforeEach(async () => {
				confessionDto = {
					content: confessionStub().content,
					tags: []
				};
				confession = await confessionController.createOne(confessionStub().ownerId, confessionDto);
			});

			test('then it should call confessionsService', () => {
				expect(confessionsService.createOne).toHaveBeenCalledWith(confessionStub().ownerId, confessionDto);
			});

			test('then it should return a Confession', () => {
				expect(confession).toEqual(confessionStub());
			});
		});
	});
});
