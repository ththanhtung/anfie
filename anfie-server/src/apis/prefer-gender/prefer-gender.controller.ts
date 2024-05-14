import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PreferGenderService } from './services/prefer-gender.service';
import { CreatePreferGenderDto, GetPreferGedersDto } from './dto';

@Controller('prefer-genders')
export class PreferGenderController {
	constructor(private readonly preferGenderService: PreferGenderService) {}

	@Get()
	findAll(@Query() query: GetPreferGedersDto) {
		return this.preferGenderService.findAll(query);
	}

	@Post()
	create(@Body() createPreferGenderDto: CreatePreferGenderDto) {
		return this.preferGenderService.create(createPreferGenderDto);
	}
}
