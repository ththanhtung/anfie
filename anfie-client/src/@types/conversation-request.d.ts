type TConversationRequestResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  firstUserId: number;
  secondUserId: number;
  status: string;
  matchedReason: string;
  expiratedAt: string;
  isFirstUserAccepted: boolean;
  isSecondUserAccepted: boolean;
  firstUser: TUser;
  secondUser: TUser;
  firstUserProfile: TUserProfile;
  secondUserProfile: TUserProfile;
};

type TAcceptConversationRequest = {
  requestId: string;
};
