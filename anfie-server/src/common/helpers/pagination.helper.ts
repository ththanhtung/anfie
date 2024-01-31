/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FindManyOptions, Repository } from 'typeorm';
import { sort } from './sort.helper';
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

	const [entities, count] = await repo.findAndCount({
		...options,
		//@ts-ignore
		order: {
			...order,
			//@ts-ignore
			id: 'DESC'
		}
	});

	if (query.order_by && query.sort) {
		sort(entities, query.order_by, query.sort);
	}

	const start = (page - 1) * limit;
	const end = page * limit;

	return [entities.slice(start, end), count];
};
