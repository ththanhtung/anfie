import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageRequestDto } from './create-message-request.dto';

export class UpdateMessageRequestDto extends PartialType(CreateMessageRequestDto) {}
