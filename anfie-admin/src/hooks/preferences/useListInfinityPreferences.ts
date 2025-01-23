"use client";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { preferencesService } from "@/services";

export const useListInfinityPreferences = () => {
  const [params, setParams] = useState<TPreferenceParams>({
    page: 1,
    limit: 10,
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_TAGS, params],
      queryFn: ({ pageParam }) =>
        preferencesService.getListPreferences({
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
  const preferences = useMemo(() => {
    return (
      data?.pages.flatMap((preference) => preference.data).filter(Boolean) || []
    );
  }, [data?.pages]);
  const preferenceOptions = useMemo(() => {
    return preferences?.map((preference) => {
      return {
        value: preference.id.toString(),
        label: preference.name,
      };
    });
  }, [preferences]);
  return {
    preferences,
    preferenceOptions,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
