import { mutationKeys, queryKeys } from "@/constants";
import { messagesService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationMessage = () => {
  const queryClient = useQueryClient();
  const { mutate: mutationCreateMessage, isPending: isCreateMessagePending } =
    useMutation<
      any,
      TResponseError,
      { conversationId: string; form: TMessageForm }
    >({
      mutationKey: [mutationKeys.MUTATION_CREATE_MESSAGE],
      mutationFn: ({ conversationId, form }) =>
        messagesService.postCreateMessage(form, conversationId),
    });

  const onCreateMessage = useCallback(
    ({ conversationId, form, cb }: TCreateMessageParams) => {
      mutationCreateMessage(
        { form, conversationId },
        {
          onSuccess: () => {
            // queryClient.invalidateQueries({
            //   queryKey: [queryKeys.GET_LIST_INFINITE_MESSAGES],
            // });
            // queryClient.invalidateQueries({
            //   queryKey: [queryKeys.GET_LIST_INFINITE_CONVERSATIONS],
            // });
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreateMessage]
  );

  return {
    onCreateMessage,
    isCreateMessagePending,
  };
};
