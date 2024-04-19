import { Injectable } from '@nestjs/common';
import { PreferGenderRepository } from '../repositories';
import { CreatePreferGenderDto, GetPreferGedersDto } from '../dto';

@Injectable()
export class PreferGenderService {
	constructor(private readonly preferGenderRepository: PreferGenderRepository) {}
	create(createPreferenceDto: CreatePreferGenderDto) {
		return this.preferGenderRepository.createOne(createPreferenceDto);
	}

	findAll(query: GetPreferGedersDto) {
		return this.preferGenderRepository.getPreferences(query);
	}

	findOneByName(name: string) {
		return this.preferGenderRepository.findOnebyName(name);
	}

	findByNames(names: string[]) {
		return this.preferGenderRepository.findByNames(names);
	}
}
