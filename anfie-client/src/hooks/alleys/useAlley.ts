import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { alleysService } from "@/services";

export const useAlley = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_FIRST_ALLEY],
    queryFn: () => alleysService.getFirstAlley(),
  });
  return {
    firstAlley: data?.data,
    isLoading,
  };
};
