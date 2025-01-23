import { useCallback } from "react";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "@/constants";
import { preferGendersService } from "@/services";

export const useMutationPreferGender = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutationCreatePreferGender,
    isPending: isCreatePreferGenderPending,
  } = useMutation<any, TResponseError, TPreferGenderForm>({
    mutationKey: [mutationKeys.MUTATION_CREATE_TAG],
    mutationFn: (form) => preferGendersService.postCreatePreferGender(form),
  });
  const {
    mutate: mutationUpdatePreferGender,
    isPending: isUpdatePreferGenderPending,
  } = useMutation<
    any,
    TResponseError,
    { preferGenderId: string; form: TPreferGenderForm }
  >({
    mutationKey: [mutationKeys.MUTATION_UPDATE_TAG],
    mutationFn: ({ preferGenderId, form }) =>
      preferGendersService.patchUpdatePreferGender(preferGenderId, form),
  });

  const onCreateOrUpdatePreferGender = useCallback(
    ({ preferGenderId, form, cb }: TCreateOrUpdatePreferGenderParams) => {
      if (preferGenderId) {
        mutationUpdatePreferGender(
          { preferGenderId, form },
          {
            onError: (error) => {
              message.error(error.response.data.errors[0].message);
            },
            onSuccess: (data) => {
              cb?.(data);
              queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
              });
              message.success("Updated preferGender successfully");
            },
          }
        );
        return;
      }
      mutationCreatePreferGender(form, {
        onError: (error) => {
          console.log(error);
          message.error("Created preferGender failed!");
        },
        onSuccess: (data) => {
          cb?.(data);
          queryClient.invalidateQueries({
            queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
          });
          message.success("Created preferGender successfully");
        },
      });
    },
    [mutationCreatePreferGender, mutationUpdatePreferGender, queryClient]
  );

  return {
    isLoading: isCreatePreferGenderPending || isUpdatePreferGenderPending,
    onCreateOrUpdatePreferGender,
  };
};
