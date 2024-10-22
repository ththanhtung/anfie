import { queryKeys } from "@/constants";
import { groupsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailsGroup = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_DETAILS_PRIVATE_GROUP, id],
    queryFn: () => groupsService.getDetailsGroup(id),
    enabled: !!id,
  });
  return {
    group: data?.data,
    isLoading,
  };
};
