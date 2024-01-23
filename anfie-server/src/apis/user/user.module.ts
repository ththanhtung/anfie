import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfiles, Users } from './entities';
import { UserService } from './services';
import { UserRepository } from './repositories';

@Module({
	controllers: [UserController],
	imports: [TypeOrmModule.forFeature([Users, UserProfiles])],
	providers: [UserService, UserRepository],
	exports: [UserService]
})
export class UserModule {}
