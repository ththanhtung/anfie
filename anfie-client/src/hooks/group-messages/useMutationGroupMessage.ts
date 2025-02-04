import { mutationKeys, queryKeys } from "@/constants";
import { groupMessagesService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationGroupMessage = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutationCreateGroupMessage,
    isPending: isCreateGroupMessagePending,
  } = useMutation<
    any,
    TResponseError,
    { groupId: string; form: FormData }
  >({
    mutationKey: [mutationKeys.MUTATION_CREATE_GROUP_MESSAGE],
    mutationFn: ({ groupId, form }) =>
      groupMessagesService.postCreateGroupMessage(form, groupId),
  });

  const onCreateGroupMessage = useCallback(
    ({ groupId, form, cb }: TCreateGroupMessageParams) => {
      mutationCreateGroupMessage(
        { form, groupId },
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
    [mutationCreateGroupMessage]
  );

  return {
    onCreateGroupMessage,
    isCreateGroupMessagePending,
  };
};
