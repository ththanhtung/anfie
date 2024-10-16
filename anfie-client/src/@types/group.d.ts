type TGroup = {
  adminId: string;
  creatorId: string;
  title: string;
  users: TUserGroup[];
  id: string;
  type: 'public' | 'private';
  created_at: string;
  updated_at: string;
  deleted_at: any;
};

type TUserGroup = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
};

type TGroupParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TGroupForm = {
  title: string;
  users: string[];
};

type TGroupAddReceipientsForm = {
  recipientIds: string[];
};

type TCreateOrUpdateGroupParams = {
  id?: string;
  form: TGroupForm;
  cb?: () => void;
};

type TAddRecipientsToGroupParams = {
  groupId: string;
  form: TGroupAddReceipientsForm;
  cb?: () => void;
};

type TLeaveGroupParams = {
  groupId: string;
  cb?: () => void;
};
