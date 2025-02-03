import { queryKeys } from "@/constants";
import { postService, reportTicketService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailsPost = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_DETAILS_POST, id],
    queryFn: () => postService.getDetailsPost(id ?? ''),
    enabled: !!id,
  });
  return {
    post: data?.data,
    isLoading,
  };
};
