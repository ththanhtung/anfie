type TConfessionParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
  tagIds?: string;
};

type TConfession = {
  id: string;
  created_at: string;
  updated_at: string;
  ownerId: string;
  content: string;
  tags: TTag[];
};

type TConfessionForm = {
  content: string;
  tags: string[];
};

type TCreateConfessionParams = {
  form: TConfessionForm;
  cb?: () => void;
};
