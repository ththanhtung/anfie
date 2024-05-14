type TUser = {
  id: number;
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
};

type TUserProfile = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  gender: string;
  phone: string;
  maxAge: any;
  minAge: any;
  isActive: boolean;
  isBanned: boolean;
  reportedCount: number;
  profilePictureUrl: any;
  bio: string;
  strangerConversationSlots: number;
  userId: number;
};
