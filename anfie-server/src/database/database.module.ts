import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from 'ormconfig';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRoot({
			...options,
			autoLoadEntities: true
		})
	]
})
export class DatabaseModule {}
