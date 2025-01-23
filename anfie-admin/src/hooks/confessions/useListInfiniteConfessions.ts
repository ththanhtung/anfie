"use client";
import { queryKeys } from "@/constants";
import { confessionsService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteConfessions = () => {
  const [params, setParams] = useState<TConfessionParams>({
    page: 1,
    limit: 10,
    sort: "DESC",
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_CONFESSIONS, params],
      queryFn: ({ pageParam }) =>
        confessionsService.getListConfessions({
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
  const confessions = useMemo(() => {
    return data?.pages.flatMap((message) => message.data).filter(Boolean) || [];
  }, [data?.pages]);

  return {
    confessions,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
