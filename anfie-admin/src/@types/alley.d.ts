type TAlley = {
  parentId: string | null | undefined;
  alleyLeft: number;
  alleyRight: number;
  groupId: string;
  title: string;
  id: string;
  disabled: boolean;
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
  cb?: (data: any) => void;
};

type TEnableAlleyParams = {
  id: string;
  cb?: () => void;
};

type TDisableAlleyParams = {
  id: string;
  cb?: () => void;
};
