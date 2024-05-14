import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../repositories';
import { GetLocationsDto } from '../dto';

@Injectable()
export class LocationsService {
	constructor(private readonly locationRepository: LocationRepository) {}
	async findByNames(names: string[]) {
		return this.locationRepository.findByNames(names);
	}

	findAll(query: GetLocationsDto) {
		return this.locationRepository.getLocations(query);
	}
}
