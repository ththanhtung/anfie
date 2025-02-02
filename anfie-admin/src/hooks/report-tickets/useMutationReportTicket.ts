import { useCallback } from "react";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys } from "@/constants";
import { reportTicketService } from "@/services";

export const useMutationReportTicket = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutationAcceptReportTicket,
    isPending: isAcceptReportTicketPending,
  } = useMutation<any, TResponseError, { ticketId: string }>({
    mutationKey: [mutationKeys.MUTATION_ACCEPT_REPORT_TICKET],
    mutationFn: ({ ticketId }) =>
      reportTicketService.patchAcceptReportTicket(ticketId),
  });

  const {
    mutate: mutationRejectReportTicket,
    isPending: isRejectReportTicketPending,
  } = useMutation<any, TResponseError, { ticketId: string }>({
    mutationKey: [mutationKeys.MUTATION_REJECT_REPORT_TICKET],
    mutationFn: ({ ticketId }) =>
      reportTicketService.patchRejectReportTicket(ticketId),
  });

  const onAcceptReportTicket = useCallback(
    ({ ticketId, cb }: TAcceptReportTicketParams) => {
      mutationAcceptReportTicket(
        { ticketId },
        {
          onError: (error: any) => {
            message.error(error.message);
          },
          onSuccess: (data, variables) => {
            cb?.();
          },
        }
      );
    },
    [mutationAcceptReportTicket]
  );

  const onRejectReportTicket = useCallback(
    ({ ticketId, cb }: TRejectReportTicketParams) => {
      mutationRejectReportTicket(
        { ticketId },
        {
          onError: (error: any) => {
            message.error(error.message);
          },
          onSuccess: (data, variables) => {
            cb?.();
          },
        }
      );
    },
    [mutationRejectReportTicket]
  );

  return {
    onAcceptReportTicket,
    onRejectReportTicket,
    isLoading: isAcceptReportTicketPending || isRejectReportTicketPending,
  };
};
