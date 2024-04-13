import { Module } from '@nestjs/common';
import { LocationsService } from './services/locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities';
import { LocationRepository } from './repositories';

@Module({
	controllers: [LocationsController],
	providers: [LocationsService, LocationRepository],
	imports: [TypeOrmModule.forFeature([Location])],
	exports: [LocationsService]
})
export class LocationsModule {}
