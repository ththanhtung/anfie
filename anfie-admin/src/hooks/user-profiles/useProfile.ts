import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { userProfilesService } from "@/services";

export const useUserProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_USER_PROFILE],
    queryFn: () => userProfilesService.getUserProfile(),
  });
  return {
    userProfile: data?.data,
    isLoading,
  };
};
