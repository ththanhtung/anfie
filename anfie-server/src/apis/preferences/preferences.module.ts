import { Module } from '@nestjs/common';
import { PreferencesService } from './services/preferences.service';
import { PreferencesController } from './preferences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preference } from './entities';
import { PreferenceRepository } from './repositories';

@Module({
	controllers: [PreferencesController],
	providers: [PreferencesService, PreferenceRepository],
	imports: [TypeOrmModule.forFeature([Preference])],
	exports: [PreferencesService]
})
export class PreferencesModule {}
