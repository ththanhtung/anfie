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

  const { mutate: mutationEnableAlley, isPending: isEnableAlleyPending } =
    useMutation<any, TResponseError, { id: string }>({
      mutationKey: [mutationKeys.MUTATION_ENABLE_ALLEY],
      mutationFn: ({ id }) => alleysService.patchEnableAlley(id),
    });

  const { mutate: mutationDisableAlley, isPending: isDisableAlleyPending } =
    useMutation<any, TResponseError, { id: string }>({
      mutationKey: [mutationKeys.MUTATION_DISABLE_ALLEY],
      mutationFn: ({ id }) => alleysService.patchDisableAlley(id),
    });

  const onEnableAlley = useCallback(
    ({ id, cb }: TEnableAlleyParams) => {
      mutationEnableAlley(
        { id },
        {
          onError: (error: any) => {
            message.error(error.message);
          },
          onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_DETAILS_ALLEY],
            });
            cb?.();
          },
        }
      );
    },
    [mutationEnableAlley, queryClient]
  );

  const onDisableAlley = useCallback(
    ({ id, cb }: TDisableAlleyParams) => {
      mutationDisableAlley(
        { id },
        {
          onError: (error: any) => {
            message.error(error.message);
          },
          onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_DETAILS_ALLEY],
            });
            cb?.();
          },
        }
      );
    },
    [mutationDisableAlley, queryClient]
  );

  const onCreateAlley = useCallback(
    ({ form, cb }: TCreateAlleyParams) => {
      mutationCreateAlley(
        { form },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_ALLEYS_BY_PARENT],
            });

            cb?.(data);
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreateAlley, queryClient]
  );

  return {
    onEnableAlley,
    onDisableAlley,
    onCreateAlley,
    isCreateAlleyPending,
    isLoading:
      isCreateAlleyPending || isEnableAlleyPending || isDisableAlleyPending,
  };
};
