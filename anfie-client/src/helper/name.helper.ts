export const getName = (userProfile?: TUserProfile) => {
  return `${userProfile?.firstName} ${userProfile?.lastName}`;
};
