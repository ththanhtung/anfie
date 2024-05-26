import { Repository } from 'typeorm';
import { ConfessionsService } from '../services';
import { Confession } from '../entities';
import { confessionStub } from './stubs';
import { Test } from '@nestjs/testing';
import { TagService } from 'src/apis/tag/services';
import { ConfessionRepository } from '../repositories';
import { OrderBy } from 'src/common';

jest.mock('../../tag/services/tag.service');

const fakeConfessionsRepository = {
	createOne: jest.fn().mockResolvedValue(confessionStub()),
	getConfestionsRandom: jest.fn().mockResolvedValue([confessionStub()]),
	findOneById: jest.fn().mockResolvedValue(confessionStub()),
	getConfessions: jest.fn().mockResolvedValue([[confessionStub()], 1])
} as unknown as Repository<Confession>;

describe('ConfessionsService', () => {
	let service: ConfessionsService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				ConfessionsService,
				{
					provide: ConfessionRepository,
					useValue: fakeConfessionsRepository
				},
				TagService
			]
		}).compile();

		service = moduleRef.get<ConfessionsService>(ConfessionsService);

		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createOne', () => {
		it('should create one', async () => {
			const confession = await service.createOne('1', {
				content: 'test'
			});
			expect(confession).toEqual(confessionStub());
		});
	});

	describe('getConfestionsRandom', () => {
		it('should get confestions random', async () => {
			const confestions = await service.getConfestionsRandom({
				page: '1',
				limit: '10',
				order_by: '',
				sort: OrderBy.ASC
			});
			expect(confestions).toEqual([confessionStub()]);
		});
	});

	describe('findOneById', () => {
		it('should get one', async () => {
			const confession = await service.findOneById('1');
			expect(confession).toEqual(confessionStub());
		});
	});

	describe('getConfessions', () => {
		it('should get confessions', async () => {
			const [confessions, total] = await service.getConfessions({
				page: '1',
				limit: '10',
				order_by: '',
				sort: OrderBy.ASC
			});
			expect(confessions).toEqual([confessionStub()]);
			expect(total).toEqual(1);
		});
	});
});
