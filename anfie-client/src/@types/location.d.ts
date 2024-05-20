type TLocation = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
};

type TLocationParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TLocationForm = {
  name: string;
};

type TCreateOrUpdateLocationParams = {
  form: TLocationForm;
  locationId?: string;
  cb?: (data: TResultResponse<any>) => void;
};
