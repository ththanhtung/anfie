import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferGenderController } from './prefer-gender.controller';
import { PreferGenderRepository } from './repositories';
import { PreferGenderService } from './services';
import { PreferGender } from './entities';

@Module({
	controllers: [PreferGenderController],
	providers: [PreferGenderRepository, PreferGenderService],
	imports: [TypeOrmModule.forFeature([PreferGender])],
	exports: [PreferGenderService]
})
export class PreferGenderModule {}
