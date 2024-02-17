"use client";
import { queryKeys } from "@/constants";
import { conversationService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteConversations = () => {
  const [params, setParams] = useState<TConversationParams>({
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
    queryKey: [queryKeys.GET_LIST_INFINITE_CONVERSATIONS, params],
    queryFn: ({ pageParam }) =>
      conversationService.getListConversations({
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
  const conversations = useMemo(() => {
    return (
      data?.pages
        .flatMap((conversation) => conversation.data)
        .filter(Boolean) || []
    );
  }, [data?.pages]);

  return {
    conversations,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
