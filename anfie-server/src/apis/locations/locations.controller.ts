import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './services/locations.service';
import { GetLocationsDto } from './dto';

@Controller('locations')
export class LocationsController {
	constructor(private readonly locationsService: LocationsService) {}

	@Get()
	findAll(@Query() query: GetLocationsDto) {
		return this.locationsService.findAll(query);
	}
}
