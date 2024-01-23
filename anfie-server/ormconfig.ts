import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

import { DataSource, DataSourceOptions } from 'typeorm';

const { TYPEORM_HOST, TYPEORM_PORT, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE } = process.env;


export const options: DataSourceOptions = {
	type: 'postgres',
	host: TYPEORM_HOST,
	port: +TYPEORM_PORT,
	username: TYPEORM_USERNAME,
	password: TYPEORM_PASSWORD,
	database: TYPEORM_DATABASE,
	synchronize: true
};

export const AppDataSource = new DataSource(options);
