import React, { useCallback, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import TableUsers from "@/components/shared/tables/table-users";
import FilterUser from "@/components/shared/filters/filter-user";
import { useListUsers } from "@/hooks/users/useListUsers";

const ModuleUsers = () => {
    const {
      users,
      isUsersLoading,
      page,
      limit,
      totalItems,
      handlePagination,
      setParams,
    } = useListUsers();

  return (
    <div className="flex flex-col gap-4">
      <FilterUser
        setParams={setParams}
      />
      <TableUsers
        totalItems={totalItems}
        page={page}
        limit={limit}
        handlePagination={handlePagination}
        users={users ?? []}
        isLoading={isUsersLoading}
      />
    </div>
  );
};
export default ModuleUsers;
