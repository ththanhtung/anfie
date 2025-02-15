import { queryKeys } from "@/constants";
import { commentsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailsComment = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_DETAILS_COMMENT, id],
    queryFn: () => commentsService.getDetailsComment(id),
    enabled: !!id,
  });
  return {
    comment: data?.data,
    isLoading,
  };
};
