type TUpdateUserProfileParams = {
  form: TUpdateUserProfileForm;
  cb?: () => void;
};

type TUpdateUserProfileForm = {
  firstName?: string;
  lastName?: string;
  dob?: string;
  user: TUpdateUserUserProfile;
  gender?: string;
  phone?: string;
  maxAge?: number;
  minAge?: number;
  isBanned?: boolean;
  profilePictureUrl?: string;
  bio?: string;
  locations?: string[];
  preferences?: string[];
  preferGenders?: string[];
};

type TUpdateUserUserProfile = {
  email: string;
};

type TFindNewFriendParams = {
  cb?: () => void;
};

type TUserProfile = {
  id: string;
  created_at: string;
  updated_at: string;
  gender: string;
  phone: string;
  maxAge: number;
  minAge: number;
  isActive: boolean;
  isBanned: boolean;
  reportedCount: number;
  bio?: string;
  userLocation: string;
  strangerConversationSlots: number;
  userId: string;
  user: TUserInProfile;
};

type TUserInProfile = {
  id: string;
  created_at: string;
  updated_at: string;
  nickName?: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  profilePictureUrl?: string;
  isFindFriend: boolean;
};
