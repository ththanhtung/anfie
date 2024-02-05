"use client";
import { queryKeys } from "@/constants";
import { messagesService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteMessages = (conversationId?: string) => {
  const [params, setParams] = useState<TConversationParams>({
    page: 1,
    limit: 10,
    sort: "DESC",
    orderBy: "created_at"
  });
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: [queryKeys.GET_LIST_INFINITE_MESSAGES, params, conversationId],
    queryFn: ({ pageParam }) =>
      messagesService.getListMessagesByConversationId(
        {
          ...params,
          page: pageParam,
        },
        conversationId
      ),
    enabled: Boolean(conversationId),
    getNextPageParam: (lastPage, allPages) => {
      const { metadata } = lastPage;
      if (params.page * metadata.limit > metadata.totalItems) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  const messages = useMemo(() => {
    return (
      data?.pages
        .flatMap((conversation) => conversation.data)
        .filter(Boolean) || []
    );
  }, [data?.pages]);

  return {
    messages,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
