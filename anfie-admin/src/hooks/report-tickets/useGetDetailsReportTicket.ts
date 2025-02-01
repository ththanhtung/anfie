import { queryKeys } from "@/constants";
import { reportTicketService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailsReportTicket = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_DETAILS_REPORT_TICKET, id],
    queryFn: () => reportTicketService.getDetailsReportTicket(id),
  });
  return {
    reportTicket: data?.data,
    isLoading,
  };
};
