"use client";
import { queryKeys } from "@/constants";
import { messageRequestsService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteMessageRequests = () => {
  const [params, setParams] = useState<TMessageRequestParams>({
    page: 1,
    limit: 10,
    sort: "DESC",
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_CONFESSIONS, params],
      queryFn: ({ pageParam }) =>
        messageRequestsService.getListMessageRequests({
          ...params,
          page: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const { metadata } = lastPage;
        if (params.page * metadata.limit > metadata.totalItems)
          return undefined;
        return allPages.length + 1;
      },
      initialPageParam: 1,
    });
  const messageRequests = useMemo(() => {
    return data?.pages.flatMap((message) => message.data).filter(Boolean) || [];
  }, [data?.pages]);

  return {
    messageRequests,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
