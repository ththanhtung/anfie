export const getName = (userProfile?: TUserProfile) => {
  return `${userProfile?.user?.firstName} ${userProfile?.user?.lastName}`;
};
