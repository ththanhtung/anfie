type TGetReportTicketsParams = {
  page: number;
  limit: number;
  status?: string;
  reporteeEmail?: string;
  reporterEmail?: string;
  ticketId?: string;
};

type TGetReportTicketsAdminResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  postId?: string;
  confessionId?: string;
  commentId?: string;
  modId?: string;
  reporterId: string;
  reporteeId: string;
  content: string;
  type: string;
  status: string;
  reporter: TUserProfile;
  reportee: TUserProfile;
  confession?: TConfession;
  post?: TPost;
  comment?: TComment;
  conversation?: TConversation;
};
