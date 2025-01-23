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
