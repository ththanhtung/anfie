import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Location } from '../entities';

export class LocationRepository extends Repository<Location> {
	constructor(@InjectRepository(Location) repository: Repository<Location>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findByNames(names: string[]) {
		return this.find({
			where: { name: In(names) }
		});
	}
}
