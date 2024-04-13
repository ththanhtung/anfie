import { In, Repository } from 'typeorm';
import { Preference } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common';
import { GetPreferencesDto } from '../dto';

export class PreferenceRepository extends Repository<Preference> {
	constructor(@InjectRepository(Preference) repository: Repository<Preference>) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getPreferences(query: GetPreferencesDto) {
		return pagination(this, query);
	}

	async createOne(params: TCreatePreferenceParams) {
		return this.save(params);
	}

	async findOnebyName(name: string) {
		return this.findOne({
			where: { name }
		});
	}

	async findByNames(names: string[]) {
		return this.find({
			where: { name: In(names) }
		});
	}
}
