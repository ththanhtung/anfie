import { useCallback } from "react";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/constants";
import { reportTicketService } from "@/services";

export const useMutationReportTicket = () => {
  const {
    mutate: mutationCreateReportTicket,
    isPending: isCreateReportTicketPending,
  } = useMutation<any, TResponseError, TPostCreateReportTicketParams>({
    mutationKey: [mutationKeys.MUTATION_CREATE_REPORT_TICKET],
    mutationFn: (form) => reportTicketService.postCreateReportTickets(form),
  });

  const onCreateReportTicket = useCallback(
    ({ form, cb }: TCreateReportTicketParams) => {
      mutationCreateReportTicket(form, {
        onError: (error: any) => {
          message.error(error.response.data.errors[0].message);
        },
        onSuccess: (data, variables) => {
          message.success("Report ticket created successfully");
          cb?.();
        },
      });
    },
    [mutationCreateReportTicket]
  );

  return {
    onCreateReportTicket,
    isLoading: isCreateReportTicketPending,
  };
};
