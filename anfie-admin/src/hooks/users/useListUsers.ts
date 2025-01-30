"use client";
import { useCallback, useMemo, useState } from "react";
import {  useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { userService } from "@/services";

export const useListUsers = () => {
  const [params, setParams] = useState<TGetUsersParams>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading: isUsersLoading } = useQuery({
    queryKey: [queryKeys.GET_LIST_USERS, params],
    queryFn: () =>
      userService.getListUsers({
        ...params,
      }),
  });
  const users = data?.data;

  const userOptions = useMemo(() => {
    return users?.map((user) => {
      return {
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      };
    });
  }, [users]);

  const handlePagination = useCallback((page: number, limit: number) => {
    setParams((prev) => ({ ...prev, page, limit }));
  }, []);

  return {
    users,
    isUsersLoading,
    userOptions,
    ...data?.metadata,
    handlePagination,
    setParams,
  };
};
