import { Controller } from '@nestjs/common';
import { MatchmakingService } from './services/matchmaking.service';

@Controller('matchmaking')
export class MatchmakingController {
	constructor(private readonly matchmakingService: MatchmakingService) {}
}
