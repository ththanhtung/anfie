type TFriendParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TuserFriend = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: any;
  profilePictureUrl: string;
};

type TFriendForm = {
  user1: string;
  user2: string;
};

type TCreateFriendParams = {
  form: TFriendForm;
  cb?: () => void;
};
