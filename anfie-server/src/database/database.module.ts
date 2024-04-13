import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from 'src/database/ormconfig';

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
