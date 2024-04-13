import { Controller } from '@nestjs/common';
import { LocationsService } from './services/locations.service';

@Controller('locations')
export class LocationsController {
	constructor(private readonly locationsService: LocationsService) {}
}
