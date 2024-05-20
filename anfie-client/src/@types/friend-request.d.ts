type TFriendRequestParams = {
  page: number;
  limit: number;
  orderBy?: string;
  sort?: TSort;
};

type TFriendRequest = {
  id: string;
  created_at: string;
  updated_at: string;
  senderId: string;
  receiverId: string;
  status: string;
  sender: TUserFriendRequest;
  receiver: TUserFriendRequest;
};

type TUserFriendRequest = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
};

type TFriendRequestForm = {
  content: string;
  confessionId: string;
};

type TCreateFriendRequestParams = {
  form: TFriendRequestForm;
  cb?: () => void;
};

type TAcceptFriendRequest = {
  requestId: string;
  cb?: () => void;
};
