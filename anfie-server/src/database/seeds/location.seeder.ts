import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Location } from 'src/apis/locations/entities';
import countries from '../../../countries.json';

export default class UserSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		await dataSource.query('TRUNCATE "location" RESTART IDENTITY;');

		const repository = dataSource.getRepository(Location);
		await repository.insert(countries);

		// ---------------------------------------------------

		const locationFactory = factoryManager.get(Location);
		// save 1 factory generated entity, to the database
		await locationFactory.save();

		// save 5 factory generated entities, to the database
		await locationFactory.saveMany(countries.length);
	}
}
