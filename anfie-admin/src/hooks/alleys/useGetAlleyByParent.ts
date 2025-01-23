import { queryKeys } from "@/constants";
import { alleysService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetAlleyByParentId = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_ALLEYS_BY_PARENT, id],
    queryFn: () => alleysService.getAlleyByParentId(id),
    enabled: !!id,
  });
  return {
    alleyChildren: data?.data,
    isLoading,
  };
};
