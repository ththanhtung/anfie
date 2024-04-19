import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferGenderDto } from './create-prefer-gender.dto';

export class UpdatePreferGenderDto extends PartialType(CreatePreferGenderDto) {}
