"use client";
import { queryKeys } from "@/constants";
import { groupMessagesService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteGroupMessages = (groupId?: string) => {
  const [params, setParams] = useState<TConversationParams>({
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
    queryKey: [queryKeys.GET_LIST_INFINITE_GROUP_MESSAGES, params, groupId],
    queryFn: ({ pageParam }) =>
      groupMessagesService.getListGroupMessagesByConversationId(
        {
          ...params,
          page: pageParam,
        },
        groupId
      ),
    enabled: Boolean(groupId),
    getNextPageParam: (lastPage, allPages) => {
      const { metadata } = lastPage;
      if (params.page * metadata.limit > metadata.totalItems) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
  const groupMessages = useMemo(() => {
    return data?.pages.flatMap((groupMessage) => groupMessage.data).filter(Boolean) || [];
  }, [data?.pages]);

  return {
    groupMessages,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
