"use client";
import { queryKeys } from "@/constants";
import { friendsService } from "@/services";
import { _common } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useListInfiniteFriends = () => {
  const [params, setParams] = useState<TFriendParams>({
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
    queryKey: [queryKeys.GET_LIST_INFINITE_FRIENDS, params],
    queryFn: ({ pageParam }) =>
      friendsService.getListFriends({
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
  const friends = useMemo(() => {
    return data?.pages.flatMap((friend) => friend.data).filter(Boolean) || [];
  }, [data?.pages]);

  const friendOptions = useMemo(() => {
    return friends?.map((friend) => {
      return {
        value: friend.id.toString(),
        label: _common.getUserFullName(friend),
      };
    });
  }, [friends]);

  return {
    friendOptions,
    friends,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
