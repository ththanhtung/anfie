import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { userProfilesService } from "@/services";

export const useUserProfile = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_USER_PROFILE],
    queryFn: () => userProfilesService.getUserProfile(userId),
  });
  return {
    userProfile: data?.data,
    isLoading,
  };
};

export const useUserProfileById = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_DETAILS_USER, userId],
    queryFn: () => userProfilesService.getUserProfileById(userId),
    enabled: !!userId,
  });
  return {
    userProfile: data?.data,
    isLoading,
  };
};
