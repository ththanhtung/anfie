import { Controller, Post, Body } from '@nestjs/common';
import { PreferencesService } from './services/preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Controller('preferences/admin')
export class PreferencesController {
	constructor(private readonly preferencesService: PreferencesService) {}

	@Post()
	create(@Body() createPreferenceDto: CreatePreferenceDto) {
		return this.preferencesService.create(createPreferenceDto);
	}
}
