type TPostCreateReportTicketParams = {
  postId?: string;
  converationId?: string;
  reporteeId: string;
  content: string;
  type: string;
};

type TCreateReportTicketParams = {
  form: TPostCreateReportTicketParams;
  cb?: () => void;
};
