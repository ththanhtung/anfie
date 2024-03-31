import { PartialType } from '@nestjs/mapped-types';
import { CreateConfestionDto } from './create-confession.dto';

export class UpdateConfestionDto extends PartialType(CreateConfestionDto) {}
