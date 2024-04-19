import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumberString, IsString, validateSync } from 'class-validator';

enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test'
}

class EnvironmentVariables {
	@IsNumberString()
	PORT;

	@IsEnum(Environment)
	NODE_ENV!: Environment;

	@IsString()
	TYPEORM_HOST;

	@IsNumberString()
	TYPEORM_PORT;

	@IsString()
	TYPEORM_USERNAME;

	@IsString()
	TYPEORM_PASSWORD;

	@IsString()
	TYPEORM_DATABASE;

	@IsString()
	SECRET_JWT;

	@IsString()
	CLD_CLOUD_NAME;

	@IsString()
	CLD_API_KEY;

	@IsString()
	CLD_API_SECRET;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true
	});

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
}
