import { useCallback } from "react";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "@/constants";
import { locationsService } from "@/services";

export const useMutationLocation = () => {
  const queryClient = useQueryClient();
  const { mutate: mutationCreateLocation, isPending: isCreateLocationPending } =
    useMutation<any, TResponseError, TLocationForm>({
      mutationKey: [mutationKeys.MUTATION_CREATE_TAG],
      mutationFn: (form) => locationsService.postCreateLocation(form),
    });
  const { mutate: mutationUpdateLocation, isPending: isUpdateLocationPending } =
    useMutation<
      any,
      TResponseError,
      { locationId: string; form: TLocationForm }
    >({
      mutationKey: [mutationKeys.MUTATION_UPDATE_TAG],
      mutationFn: ({ locationId, form }) =>
        locationsService.patchUpdateLocation(locationId, form),
    });

  const onCreateOrUpdateLocation = useCallback(
    ({ locationId, form, cb }: TCreateOrUpdateLocationParams) => {
      if (locationId) {
        mutationUpdateLocation(
          { locationId, form },
          {
            onError: (error) => {
              message.error(error.response.data.errors[0].message);
            },
            onSuccess: (data) => {
              cb?.(data);
              queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
              });
              message.success("Updated location successfully");
            },
          }
        );
        return;
      }
      mutationCreateLocation(form, {
        onError: (error) => {
          console.log(error);
          message.error("Created location failed!");
        },
        onSuccess: (data) => {
          cb?.(data);
          queryClient.invalidateQueries({
            queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
          });
          message.success("Created location successfully");
        },
      });
    },
    [mutationCreateLocation, mutationUpdateLocation, queryClient]
  );

  return {
    isLoading: isCreateLocationPending || isUpdateLocationPending,
    onCreateOrUpdateLocation,
  };
};
