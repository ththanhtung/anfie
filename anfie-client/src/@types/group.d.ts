type TGroup = {
  adminId: number;
  creatorId: number;
  title: string;
  users: TUserGroup[];
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
};

type TUserGroup = {
  id: number;
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

type TCreateOrUpdateGroupParams = {
  id?: string;
  form: TGroupForm;
  cb?: () => void;
};
