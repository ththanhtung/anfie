import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationRequestDto } from './create-conversation-request.dto';

export class UpdateConversationRequestDto extends PartialType(CreateConversationRequestDto) {}
