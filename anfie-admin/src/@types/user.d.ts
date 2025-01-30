type TUser = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  email: string;
  refreshToken: string;
  accessToken?: any;
  firstName: string;
  lastName: string;
  dob?: string;
  profilePictureUrl?: string;
  isFindFriend: boolean;
};

type TUserProfile = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  gender: string;
  phone: string;
  maxAge: number;
  minAge: number;
  isActive: boolean;
  isBanned: boolean;
  reportedCount: number;
  profilePictureUrl: any;
  bio: string;
  strangerConversationSlots: number;
  userId: string;
  user?: TUser;
};

type TGetTUserProfileResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  gender: string;
  phone: string;
  maxAge: any;
  minAge: any;
  isActive: boolean;
  isBanned: boolean;
  reportedCount: number;
  bio: any;
  strangerConversationSlots: number;
  userId: string;
  locations: any[];
  userLocation: string;
  preferences: any[];
  preferGenders: TPreferGender[];
  user: TUser;
};

type TGetUsersAdminResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  email: string;
  refreshToken: string;
  accessToken?: any;
  firstName: string;
  lastName: string;
  dob?: string;
  profilePictureUrl?: string;
  isFindFriend: boolean;
  profile: TGetTUserProfileResponse;
};

type TGetUsersParams = {
  page: number;
  limit: number;
  firstname?: string;
  lastname?: string;
  ageRange?: string;
  gender?: string;
  preferences?: string;
  isBanned?: string;
  location?: string;
};
