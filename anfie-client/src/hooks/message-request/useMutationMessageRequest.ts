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

  const onCreateMessageRequest = useCallback(
    ({ form, cb }: TCreateMessageRequestParams) => {
      mutationCreateMessageRequest(
        { form },
        {
          onSuccess: () => {
            cb?.();
          },
          onError: (error) => {
            message.error(error.message);
          },
        }
      );
    },
    [mutationCreateMessageRequest]
  );

  return {
    onCreateMessageRequest,
    isCreateMessageRequestPending,
  };
};
