import { mutationKeys, queryKeys } from "@/constants";
import { conversationService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationConversation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutationLeaveConversation,
    isPending: isLeaveConversationPending,
  } = useMutation<any, TResponseError, { id: string }>({
    mutationKey: [mutationKeys.MUTATION_LEAVE_CONVERSATION],
    mutationFn: ({ id }) => conversationService.postLeaveConversation(id),
  });

  const onLeaveConversation = useCallback(
    ({ id, cb }: TLeaveConversationParams) => {
      mutationLeaveConversation(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_CONVERSATIONS],
            });
            message.success("Leave conversation successfully");
            cb?.();
          },
          onError: (error) => {  
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationLeaveConversation, queryClient]
  );

  return {
    onLeaveConversation,
    isPeding: isLeaveConversationPending,
  };
};
