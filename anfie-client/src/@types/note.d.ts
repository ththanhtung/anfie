type TNote = {
  userId: string;
  id: string;
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
  order_by?: string;
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

type TDeleteNoteParams = {
  id: string;
  cb?: () => void;
};
