import React from "react";
import { useListReportTicket } from "@/hooks";
import { FilterTicket } from "@/components";
import TableTickets from "@/components/shared/tables/table-report-tickets";

const ModuleReportTickets = () => {
  const {
    tickets,
    isTicketsLoading,
    page,
    limit,
    totalItems,
    handlePagination,
    setParams,
  } = useListReportTicket();

  return (
    <div className="flex flex-col gap-4">
      <FilterTicket setParams={setParams} />
      <TableTickets
        totalItems={totalItems}
        page={page}
        limit={limit}
        handlePagination={handlePagination}
        tickets={tickets ?? []}
        isLoading={isTicketsLoading}
      />
    </div>
  );
};
export default ModuleReportTickets;
