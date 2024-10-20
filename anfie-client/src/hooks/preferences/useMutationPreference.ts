import { useCallback } from "react";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "@/constants";
import { preferencesService } from "@/services";

export const useMutationPreference = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutationCreatePreference,
    isPending: isCreatePreferencePending,
  } = useMutation<any, TResponseError, TPreferenceForm>({
    mutationKey: [mutationKeys.MUTATION_CREATE_TAG],
    mutationFn: (form) => preferencesService.postCreatePreference(form),
  });
  const {
    mutate: mutationUpdatePreference,
    isPending: isUpdatePreferencePending,
  } = useMutation<
    any,
    TResponseError,
    { preferenceId: string; form: TPreferenceForm }
  >({
    mutationKey: [mutationKeys.MUTATION_UPDATE_TAG],
    mutationFn: ({ preferenceId, form }) =>
      preferencesService.patchUpdatePreference(preferenceId, form),
  });

  const onCreateOrUpdatePreference = useCallback(
    ({ preferenceId, form, cb }: TCreateOrUpdatePreferenceParams) => {
      if (preferenceId) {
        mutationUpdatePreference(
          { preferenceId, form },
          {
            onError: (error) => {
              message.error(error.response.data.errors[0].message);
            },
            onSuccess: (data) => {
              cb?.(data);
              queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
              });
              message.success("Updated preference successfully");
            },
          }
        );
        return;
      }
      mutationCreatePreference(form, {
        onError: (error) => {
          console.log(error);
          message.error("Created preference failed!");
        },
        onSuccess: (data) => {
          cb?.(data);
          queryClient.invalidateQueries({
            queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
          });
          message.success("Created preference successfully");
        },
      });
    },
    [mutationCreatePreference, mutationUpdatePreference, queryClient]
  );

  return {
    isLoading: isCreatePreferencePending || isUpdatePreferencePending,
    onCreateOrUpdatePreference,
  };
};
