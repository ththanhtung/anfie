"use client";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { locationsService } from "@/services";

export const useListInfinityLocations = () => {
  const [params, setParams] = useState<TLocationParams>({
    page: 1,
    limit: 10,
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_LOCATIONS, params],
      queryFn: ({ pageParam }) =>
        locationsService.getListLocations({
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
  const locations = useMemo(() => {
    return (
      data?.pages.flatMap((location) => location.data).filter(Boolean) || []
    );
  }, [data?.pages]);
  const locationOptions = useMemo(() => {
    return locations?.map((location) => {
      return {
        value: location.id.toString(),
        label: location.name,
      };
    });
  }, [locations]);
  return {
    locations,
    locationOptions,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
