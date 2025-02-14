import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfiles, Users } from './entities';
import { UserProfileService, UserService } from './services';
import { UserProfileRepository, UserRepository } from './repositories';
import { PreferencesModule } from '../preferences/preferences.module';
import { UserProfileController } from './user-profile.controller';
import { LocationsModule } from '../locations/locations.module';
import { PreferGenderModule } from '../prefer-gender/prefer-gender.module';
import { UserAdminController } from './user.admin.controller';
import { UserProfileAdminController } from './user-profile.admin.controller';

@Module({
	controllers: [UserController, UserProfileController, UserAdminController, UserProfileAdminController],
	imports: [TypeOrmModule.forFeature([Users, UserProfiles]), PreferencesModule, LocationsModule, PreferGenderModule],
	providers: [UserService, UserRepository, UserProfileService, UserProfileRepository],
	exports: [UserService, UserProfileService]
})
export class UserModule {}
