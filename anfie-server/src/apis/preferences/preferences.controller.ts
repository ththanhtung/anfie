import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PreferencesService } from './services/preferences.service';

import { CreatePreferenceDto, GetPreferencesDto } from './dto';

@Controller('preferences')
export class PreferencesController {
	constructor(private readonly preferencesService: PreferencesService) {}

	@Get()
	findAll(@Query() query: GetPreferencesDto) {
		return this.preferencesService.findAll(query);
	}

	@Post()
	create(@Body() createPreferenceDto: CreatePreferenceDto) {
		return this.preferencesService.create(createPreferenceDto);
	}
}
