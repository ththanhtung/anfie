import { mutationKeys } from "@/constants";
import { confessionsService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationConfession = () => {
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
            // queryClient.invalidateQueries({
            //   queryKey: [queryKeys.GET_LIST_INFINITE_MESSAGES],
            // });
            // queryClient.invalidateQueries({
            //   queryKey: [queryKeys.GET_LIST_INFINITE_CONVERSATIONS],
            // });
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreateConfession]
  );

  return {
    onCreateConfession,
    isCreateConfessionPending,
  };
};
