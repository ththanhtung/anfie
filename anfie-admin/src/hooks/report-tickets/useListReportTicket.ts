"use client";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants";
import { reportTicketService } from "@/services";

export const useListReportTicket = () => {
  const [params, setParams] = useState<TGetReportTicketsParams>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading: isTicketsLoading } = useQuery({
    queryKey: [queryKeys.GET_LIST_REPORT_TICKETS, params],
    queryFn: () =>
      reportTicketService.getListReportTickets({
        ...params,
      }),
  });
  const tickets = data?.data;

  const ticketOptions = useMemo(() => {
    return tickets?.map((ticket) => {
      return {
        value: ticket.id,
        label: ticket.id,
      };
    });
  }, [tickets]);

  const handlePagination = useCallback((page: number, limit: number) => {
    setParams((prev) => ({ ...prev, page, limit }));
  }, []);

  return {
    tickets,
    isTicketsLoading,
    ticketOptions,
    ...data?.metadata,
    handlePagination,
    setParams,
  };
};
