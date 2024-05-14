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
  maxAge?: any;
  minAge?: any;
  isBanned?: boolean;
  profilePictureUrl?: any;
  bio?: string;
  locations?: string[];
  preferences?: string[];
  preferGenders?: string[];
};

type TUpdateUserUserProfile = {
  email: string;
};
