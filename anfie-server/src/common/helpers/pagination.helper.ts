/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDto } from '../utils';

export const pagination = async <T>(repo: Repository<T>, query: PaginationDto, options?: FindManyOptions<T>): Promise<[T[], number]> => {
	const page = query.page ? +query.page : 1;
	const limit = query.limit ? +query.limit : 10;

	let order = {
		// id: 'DESC'
	};

	if (Object.keys(options?.order || {}).length > 0) {
		order = {
			...options?.order
		};
	}

	if (query.order_by && query.sort) {
		order = {
			...order,
			[query.order_by]: query.sort
		};
	}

	const [entities, count] = await repo.findAndCount({
		...options,
		skip: (page - 1) * limit,
		take: limit,
		order
	});

	return [entities, count];
};
