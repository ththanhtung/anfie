import { queryKeys } from "@/constants";
import { alleysService, groupsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailsAlley = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_DETAILS_ALLEY, id],
    queryFn: () => alleysService.getDetailsAlley(id ?? ''),
    enabled: !!id,
  });
  return {
    alley: data?.data,
    isLoading,
  };
};
