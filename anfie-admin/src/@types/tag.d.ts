type TTag = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
};

type TTagParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
  tags?: string[];
};

type TTagForm = {
  name: string;
};

type TCreateOrUpdateTagParams = {
  form: TTagForm;
  tagId?: string;
  cb?: (data: TResultResponse<any>) => void;
};
