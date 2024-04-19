import { Controller, Get, Query } from '@nestjs/common';
import { PreferGenderService } from './services/prefer-gender.service';
import { GetPreferGedersDto } from './dto';

@Controller('prefer-gender')
export class PreferGenderController {
	constructor(private readonly preferGenderService: PreferGenderService) {}

	@Get()
	findAll(@Query() query: GetPreferGedersDto) {
		return this.preferGenderService.findAll(query);
	}
}
