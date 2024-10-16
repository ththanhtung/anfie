import { mutationKeys, queryKeys } from "@/constants";
import { alleysService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationAlley = () => {
  const queryClient = useQueryClient();
  const { mutate: mutationCreateAlley, isPending: isCreateAlleyPending } =
    useMutation<any, TResponseError, { form: TAlleyForm }>({
      mutationKey: [mutationKeys.MUTATION_CREATE_ALLEY],
      mutationFn: ({ form }) => alleysService.postCreateAlley(form),
    });

  const onCreateAlley = useCallback(
    ({ form, cb }: TCreateAlleyParams) => {
      mutationCreateAlley(
        { form },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_ALLEYS_BY_PARENT],
            });

            cb?.();
          },
          onError: (error) => {
            message.error(error.message);
          },
        }
      );
    },
    [mutationCreateAlley, queryClient]
  );

  return {
    onCreateAlley,
    isCreateAlleyPending,
  };
};
