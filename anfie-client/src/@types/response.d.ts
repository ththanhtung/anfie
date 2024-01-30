type TResponseError = {
  code: number;
  message: string;
  errors: string;
  data: [];
  success: boolean;
};

type TMetadataPagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
};

type TResultResponse<T = unknown, E = unknown> = {
  code: number;
  success: boolean;
  errors: E;
  data: T;
  metadata: TMetadataPagination;
};

type TMetadata = { name: string; values: any };

type TMetadataAtom = {
  [key: string]: Array<{
    value: string;
    label: string;
  }>;
};
