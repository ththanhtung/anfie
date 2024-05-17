type TFriendParams = {
  page: number;
  limit: number;
  order_by?: string;
  sort?: TSort;
};

type TuserFriend = {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  firstName: any;
  lastName: any;
  dob: any;
  profilePictureUrl: any;
};

type TFriendForm = {
  user1: string;
  user2: string;
};

type TCreateFriendParams = {
  form: TFriendForm;
  cb?: () => void;
};
