"use client";
import { queryKeys } from "@/constants";
import { postService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfinitePosts = () => {
  const [params, setParams] = useState<TPostParams>({
    page: 1,
    limit: 10,
    sort: "DESC",
    order_by: "created_at",
  });
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: [queryKeys.GET_LIST_INFINITE_POSTS, params],
    queryFn: ({ pageParam }) =>
      postService.getListPosts({
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const { metadata } = lastPage;
      if (params.page * metadata.limit > metadata.totalItems) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  const posts = useMemo(() => {
    return data?.pages.flatMap((post) => post.data).filter(Boolean) || [];
  }, [data?.pages]);

  return {
    posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
