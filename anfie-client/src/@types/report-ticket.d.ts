type TPostCreateReportTicketParams = {
  postId?: string;
  conversationId?: string;
  reporteeId?: string;
  content: string;
  type: string;
};

type TCreateReportTicketParams = {
  form: TPostCreateReportTicketParams;
  cb?: () => void;
};
