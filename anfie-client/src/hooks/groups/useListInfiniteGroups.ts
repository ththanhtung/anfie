"use client";
import { queryKeys } from "@/constants";
import { groupsService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteGroups = () => {
  const [params, setParams] = useState<TGroupParams>({
    page: 1,
    limit: 10,
    sort: "DESC",
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_GROUP_CONVERSATIONS, params],
      queryFn: ({ pageParam }) =>
        groupsService.getListGroups({
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
  const groups = useMemo(() => {
    return data?.pages.flatMap((message) => message.data).filter(Boolean) || [];
  }, [data?.pages]);

  return {
    groups,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
