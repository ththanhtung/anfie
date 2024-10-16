import { queryKeys } from "@/constants";
import { alleysService, groupsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailsPublicGroup = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_DETAILS_PUBLIC_GROUP, id],
    queryFn: () => groupsService.getDetailsPublicGroup(id),
    enabled: !!id,
  });
  return {
    publicGroup: data?.data,
    isLoading,
  };
};
