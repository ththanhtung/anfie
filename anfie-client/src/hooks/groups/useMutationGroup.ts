import { mutationKeys, queryKeys } from "@/constants";
import { groupsService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationGroup = () => {
  const queryClient = useQueryClient();

  const { mutate: mutationCreateGroup, isPending: isCreateGroupPending } =
    useMutation<any, TResponseError, { form: TGroupForm }>({
      mutationKey: [mutationKeys.MUTATION_CREATE_NOTE],
      mutationFn: ({ form }) => groupsService.postCreateGroup(form),
    });

  const { mutate: mutationUpdateGroup, isPending: isUpdateGroupPending } =
    useMutation<any, TResponseError, { id: string; form: TGroupForm }>({
      mutationKey: [mutationKeys.MUTATION_UPDATE_NOTE],
      mutationFn: ({ id, form }) => groupsService.patchUpdateGroup(id, form),
    });

  const onCreateOrUpdateGroup = useCallback(
    ({ id, form, cb }: TCreateOrUpdateGroupParams) => {
      if (id) {
        mutationUpdateGroup(
          { id, form },
          {
            onError: (error) => {
              message.error(error.message);
            },
            onSuccess: () => {
              cb?.();
              queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_LIST_INFINITY_NOTES],
              });
              message.success("Updated group successfully");
            },
          }
        );
        return;
      }
      mutationCreateGroup(
        { form },
        {
          onError: (error) => {
            console.log(error);
            message.error("Created group failed!");
          },
          onSuccess: () => {
            cb?.();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITY_NOTES],
            });
            message.success("Created group successfully");
          },
        }
      );
    },
    [mutationCreateGroup, mutationUpdateGroup, queryClient]
  );

  return {
    onCreateOrUpdateGroup,
    isCreateGroupPending,
  };
};
