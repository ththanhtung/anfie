import { mutationKeys, queryKeys } from "@/constants";
import { confessionsService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationConfession = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutationCreateConfession,
    isPending: isCreateConfessionPending,
  } = useMutation<any, TResponseError, { form: TConfessionForm }>({
    mutationKey: [mutationKeys.MUTATION_CREATE_CONFESSION],
    mutationFn: ({ form }) => confessionsService.postCreateConfession(form),
  });

  const onCreateConfession = useCallback(
    ({ form, cb }: TCreateConfessionParams) => {
      mutationCreateConfession(
        { form },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_CONFESSIONS],
            });
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreateConfession, queryClient]
  );

  return {
    onCreateConfession,
    isCreateConfessionPending,
  };
};
