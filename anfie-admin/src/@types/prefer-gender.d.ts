type TPreferGender = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
};

type TPreferGenderParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TPreferGenderForm = {
  name: string;
};

type TCreateOrUpdatePreferGenderParams = {
  form: TPreferGenderForm;
  preferGenderId?: string;
  cb?: (data: TResultResponse<any>) => void;
};
