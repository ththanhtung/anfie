"use client";
import { queryKeys } from "@/constants";
import { groupConversationService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteGroupConversations = () => {
  const [params, setParams] = useState<TGroupConversationParams>({
    page: 1,
    limit: 10,
    order_by: "updated_at",
    sort: "DESC",
  });
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: [queryKeys.GET_LIST_INFINITE_GROUP_CONVERSATIONS, params],
    queryFn: ({ pageParam }) =>
      groupConversationService.getListGroupConversations({
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
  const groupConversations = useMemo(() => {
    return (
      data?.pages
        .flatMap((groupConversation) => groupConversation.data)
        .filter(Boolean) || []
    );
  }, [data?.pages]);

  return {
    groupConversations,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
