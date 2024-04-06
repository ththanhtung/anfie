type TReportTicketStatus = 'accepted' | 'pending' | 'rejected';
type TReportTicketType = 'conversation' | 'confession' | 'comment' | 'diary';

type TCreateReportTicketParams = {
	reporterId: string;
	reportedId: string;
	content: string;
	type: TReportTicketType;
	status?: TReportTicketStatus;
};
