import { queryKeys } from "@/constants";
import { alleysService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetGroupByAlleyId = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_GROUP_BY_ALLEY_ID, id],
    queryFn: () => alleysService.getGroupByAlleyId(id),
    enabled: !!id,
  });
  return {
    group: data?.data,
    isLoading,
  };
};
