type TGroupMessage = {
  content: string;
  userId: string;
  user: TUser;
  groupId: number;
  group: TGroup;
  id: number;
  created_at: string;
  updated_at: string;
  isSeen: boolean;
};

type TGroupMessageParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TGroupMessageForm = {
  content: string;
};

type TCreateGroupMessageParams = {
  groupId: string;
  form: TGroupMessageForm;
  cb?: () => void;
};
