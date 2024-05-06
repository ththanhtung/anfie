import { mutationKeys } from "@/constants";
import { conversationRequestService } from "@/services/conversation-request.service";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationConversatinoRequest = () => {
  const {
    mutate: mutationAcceptConversationRequest,
    isPending: isAcceptPending,
  } = useMutation<any, TResponseError, { requestId: string }>({
    mutationKey: [mutationKeys.MUTATION_ACCEPT_CONVERSATION_REQUEST],
    mutationFn: ({ requestId }) =>
      conversationRequestService.acceptRequest(requestId),
  });

  const {
    mutate: mutationRejectConversationRequest,
    isPending: isRejectPending,
  } = useMutation<any, TResponseError, { requestId: string }>({
    mutationKey: [mutationKeys.MUTATION_ACCEPT_CONVERSATION_REQUEST],
    mutationFn: ({ requestId }) =>
      conversationRequestService.rejectRequest(requestId),
  });

  const onAcceptConversationRequest = useCallback(
    ({ requestId, cb }: TAcceptConversationRequest) => {
      mutationAcceptConversationRequest(
        { requestId },
        {
          onError: (error) => {
            message.error(error.message);
          },
        }
      );
    },
    [mutationAcceptConversationRequest]
  );

  const onRejectConversationRequest = useCallback(
    ({ requestId, cb }: TAcceptConversationRequest) => {
      mutationRejectConversationRequest(
        { requestId },
        {
          onError: (error) => {
            message.error(error.message);
          },
        }
      );
    },
    [mutationRejectConversationRequest]
  );

  return {
    onAcceptConversationRequest,
    onRejectConversationRequest,
    isPeding: isAcceptPending || isRejectPending,
  };
};
