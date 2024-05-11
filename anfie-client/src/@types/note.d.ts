type TNote = {
  userId: string;
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  title: string;
  content: string;
  isPin: boolean;
};

type TNoteParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TNoteForm = {
  title?: string;
  content?: string;
  isPin?: boolean;
};

type TCreateOrUpdateNoteParams = {
  id?: string;
  form: TNoteForm;
  cb?: () => void;
};
