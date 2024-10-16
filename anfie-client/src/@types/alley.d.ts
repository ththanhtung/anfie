type TAlley = {
  parentId: string | null | undefined;
  alleyLeft: number;
  alleyRight: number;
  groupId: string;
  title: string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null | undefined;
};

type TAlleyForm = {
  title: string;
  parentId?: string | null | undefined;
};

type TCreateAlleyParams = {
  form: TAlleyForm;
  cb?: () => void;
};
