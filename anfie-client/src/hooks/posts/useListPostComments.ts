"use client";
import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { postService } from "@/services";

export const useListPostComment = (postId: string) => {
  const [params, setParams] = useState<TGetComnentsParams>({
    page: 1,
    limit: 10,
    order_by: "created_at",
    sort: "DESC",
  });
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKeys.GET_LIST_COMMENTS_BY_POST, postId, params],
    queryFn: ({ pageParam }) =>
      postService.getPostComments(postId, {
        ...params,
        page: pageParam,
      }),
    enabled: !!postId,
    getNextPageParam: (lastPage, allPages) => {
      const { metadata } = lastPage;
      if (params.page * metadata.limit > metadata.totalItems) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  const comments = useMemo(() => {
    return data?.pages.flatMap((comment) => comment.data).filter(Boolean) || [];
  }, [data?.pages]);

  return {
    refetch,
    comments,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
