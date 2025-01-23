type TGroupMessage = {
  content: string;
  userId: string;
  user: TUser;
  groupId: string;
  group: TGroup;
  id: string;
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
  form: FormData;
  cb?: () => void;
};
