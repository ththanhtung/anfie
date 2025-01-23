"use client";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { preferGendersService } from "@/services";

export const useListInfinityPreferGenders = () => {
  const [params, setParams] = useState<TPreferGenderParams>({
    page: 1,
    limit: 10,
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_LIST_INFINITE_PREFER_GENDERS, params],
      queryFn: ({ pageParam }) =>
        preferGendersService.getListPreferGenders({
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
  const preferGenders = useMemo(() => {
    return (
      data?.pages
        .flatMap((preferGender) => preferGender.data)
        .filter(Boolean) || []
    );
  }, [data?.pages]);
  const preferGenderOptions = useMemo(() => {
    return preferGenders?.map((preferGender) => {
      return {
        value: preferGender.id.toString(),
        label: preferGender.name,
      };
    });
  }, [preferGenders]);
  return {
    preferGenders,
    preferGenderOptions,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    total: data?.pages?.[0].metadata?.totalItems,
    setParams,
  };
};
