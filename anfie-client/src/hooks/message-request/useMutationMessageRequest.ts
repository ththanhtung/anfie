import { mutationKeys } from "@/constants";
import { messageRequestsService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationMessageRequest = () => {
  const {
    mutate: mutationCreateMessageRequest,
    isPending: isCreateMessageRequestPending,
  } = useMutation<any, TResponseError, { form: TMessageRequestForm }>({
    mutationKey: [mutationKeys.MUTATION_CREATE_MESSAGE_REQUEST],
    mutationFn: ({ form }) =>
      messageRequestsService.postCreateMessageRequest(form),
  });
  const { mutate: mutationAcceptMessageRequest, isPending: isAcceptPending } =
    useMutation<any, TResponseError, { requestId: string }>({
      mutationKey: [mutationKeys.MUTATION_ACCEPT_CONVERSATION_REQUEST],
      mutationFn: ({ requestId }) =>
        messageRequestsService.acceptRequest(requestId),
    });

  const { mutate: mutationRejectMessageRequest, isPending: isRejectPending } =
    useMutation<any, TResponseError, { requestId: string }>({
      mutationKey: [mutationKeys.MUTATION_ACCEPT_CONVERSATION_REQUEST],
      mutationFn: ({ requestId }) =>
        messageRequestsService.rejectRequest(requestId),
    });

  const onCreateMessageRequest = useCallback(
    ({ form, cb }: TCreateMessageRequestParams) => {
      mutationCreateMessageRequest(
        { form },
        {
          onSuccess: () => {
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreateMessageRequest]
  );

  const onAcceptMessageRequest = useCallback(
    ({ requestId, cb }: TAcceptMessageRequest) => {
      mutationAcceptMessageRequest(
        { requestId },
        {
          onSuccess: () => {
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationAcceptMessageRequest]
  );

  const onRejectMessageRequest = useCallback(
    ({ requestId, cb }: TAcceptMessageRequest) => {
      mutationRejectMessageRequest(
        { requestId },
        {
          onSuccess: () => {
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationRejectMessageRequest]
  );

  return {
    onCreateMessageRequest,
    onAcceptMessageRequest,
    onRejectMessageRequest,
    isCreateMessageRequestPending,
    isAcceptPending,
    isRejectPending,
  };
};
