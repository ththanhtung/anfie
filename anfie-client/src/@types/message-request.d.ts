type TMessageRequestParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TMessageRequest = {
  senderId: number;
  receiverId: number;
  confessionId: number;
  content: string;
  id: number;
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
