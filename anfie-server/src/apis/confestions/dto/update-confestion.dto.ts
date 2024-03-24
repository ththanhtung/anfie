import { PartialType } from '@nestjs/mapped-types';
import { CreateConfestionDto } from './create-confestion.dto';

export class UpdateConfestionDto extends PartialType(CreateConfestionDto) {}
