type TPreference = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
};

type TPreferenceParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
  preferences?: string[];
};

type TPreferenceForm = {
  name: string;
};

type TCreateOrUpdatePreferenceParams = {
  form: TPreferenceForm;
  preferenceId?: string;
  cb?: (data: TResultResponse<any>) => void;
};
