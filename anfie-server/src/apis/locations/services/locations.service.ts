import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../repositories';

@Injectable()
export class LocationsService {
	constructor(private readonly locationRepository: LocationRepository) {}
	async findByNames(names: string[]) {
		return this.locationRepository.findByNames(names);
	}
}
