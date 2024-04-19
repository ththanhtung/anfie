import { Message } from 'src/apis/message/entities';
import { EReportTicketType } from '../enums/reportTicket';
import { EReportTicketStatus } from '../enums';

type TReportTicketStatus = 'accepted' | 'pending' | 'rejected';
type TReportTicketType = 'conversation' | 'confession' | 'comment' | 'diary';

type TCreateReportTicketParams = {
	postId: string;
	commentId: string;
	confessionId: string;
	messages: Message[];
	reporterId: string;
	reporteeId: string;
	content: string;
	type: EReportTicketType;
	status?: EReportTicketStatus;
};
