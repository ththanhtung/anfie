type TMessageRequestParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TMessageRequest = {
  senderId: string;
  receiverId: string;
  confessionId: string;
  content: string;
  confession: TConfession;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  status: string;
};

type TMessageRequestForm = {
  content: string;
  confessionId: string;
};

type TCreateMessageRequestParams = {
  form: TMessageRequestForm;
  cb?: () => void;
};

type TAcceptMessageRequest = {
  requestId: string;
  cb?: () => void;
};
