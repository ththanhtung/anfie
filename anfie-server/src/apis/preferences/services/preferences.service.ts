import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from '../dto/create-preference.dto';
import { PreferenceRepository } from '../repositories';
import { GetPreferencesDto } from '../dto';

@Injectable()
export class PreferencesService {
	constructor(private readonly preferencesRepository: PreferenceRepository) {}
	create(createPreferenceDto: CreatePreferenceDto) {
		return this.preferencesRepository.createOne(createPreferenceDto);
	}

	findAll(query: GetPreferencesDto) {
		return this.preferencesRepository.getPreferences(query);
	}

	findOneByName(name: string) {
		return this.preferencesRepository.findOnebyName(name);
	}

	findByNames(names: string[]) {
		return this.preferencesRepository.findByNames(names);
	}
}
