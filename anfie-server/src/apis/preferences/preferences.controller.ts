import { Controller, Get, Query } from '@nestjs/common';
import { PreferencesService } from './services/preferences.service';

import { GetPreferencesDto } from './dto';

@Controller('preferences')
export class PreferencesController {
	constructor(private readonly preferencesService: PreferencesService) {}

	@Get()
	findAll(@Query() query: GetPreferencesDto) {
		return this.preferencesService.findAll(query);
	}
}
