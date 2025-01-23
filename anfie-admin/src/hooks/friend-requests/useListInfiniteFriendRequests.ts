"use client";
import { queryKeys } from "@/constants";
import { friendRequestsService } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteFriendRequests = () => {
  const [params, setParams] = useState<TFriendRequestParams>({
    page: 1,
    limit: 10,
    sort: "DESC",
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_FRIEND_REQUESTS, params],
      queryFn: ({ pageParam }) =>
        friendRequestsService.getListFriendRequests({
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
  const friendRequests = useMemo(() => {
    return data?.pages.flatMap((friend) => friend.data).filter(Boolean) || [];
  }, [data?.pages]);

  return {
    friendRequests,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
