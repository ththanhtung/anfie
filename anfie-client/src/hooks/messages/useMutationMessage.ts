import { mutationKeys } from "@/constants";
import { messagesService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationMessage = () => {
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
            message.success("Message sent");
          },
          onError: (error) => {
            message.error(error.message);
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
