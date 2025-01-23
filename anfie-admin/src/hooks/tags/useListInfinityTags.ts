'use client'
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { tagsService } from "@/services";

export const useListInfinityTags = ({
  searchText,
  enabled,
}: {
  searchText?: string;
  enabled?: any;
}) => {
  const [params, setParams] = useState<TTagParams>({
    page: 1,
    limit: 10,
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_TAGS, searchText, params],
      queryFn: ({ pageParam }) =>
        tagsService.getListTags({
          ...params,
          page: pageParam,
        }),
      enabled: enabled,
      getNextPageParam: (lastPage, allPages) => {
        const { metadata } = lastPage;
        if (params.page * metadata.limit > metadata.totalItems)
          return undefined;
        return allPages.length + 1;
      },
      initialPageParam: 1,
    });
  const tags = useMemo(() => {
    return data?.pages.flatMap((tag) => tag.data).filter(Boolean) || [];
  }, [data?.pages]);
  const tagOptions = useMemo(() => {
    return tags?.map((tag) => {
      return {
        value: tag.id.toString(),
        label: tag.name,
      };
    });
  }, [tags]);
  return {
    tags,
    tagOptions,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
