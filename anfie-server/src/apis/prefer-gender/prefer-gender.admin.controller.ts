import { Body, Controller, Post } from '@nestjs/common';
import { PreferGenderService } from './services/prefer-gender.service';
import { CreatePreferGenderDto } from './dto';

@Controller('prefer-gender/admin')
export class PreferGenderController {
	constructor(private readonly preferGenderService: PreferGenderService) {}

	@Post()
	create(@Body() createPreferGenderDto: CreatePreferGenderDto) {
		return this.preferGenderService.create(createPreferGenderDto);
	}
}
