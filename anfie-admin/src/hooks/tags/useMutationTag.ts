import { useCallback } from "react";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "@/constants";
import { tagsService } from "@/services";

export const useMutationTag = () => {
  const queryClient = useQueryClient();
  const { mutate: mutationCreateTag, isPending: isCreateTagPending } =
    useMutation<any, TResponseError, TTagForm>({
      mutationKey: [mutationKeys.MUTATION_CREATE_TAG],
      mutationFn: (form) => tagsService.postCreateTag(form),
    });
  const { mutate: mutationUpdateTag, isPending: isUpdateTagPending } =
    useMutation<any, TResponseError, { tagId: string; form: TTagForm }>({
      mutationKey: [mutationKeys.MUTATION_UPDATE_TAG],
      mutationFn: ({ tagId, form }) => tagsService.patchUpdateTag(tagId, form),
    });

  const onCreateOrUpdateTag = useCallback(
    ({ tagId, form, cb }: TCreateOrUpdateTagParams) => {
      if (tagId) {
        mutationUpdateTag(
          { tagId, form },
          {
            onError: (error) => {
              message.error(error.response.data.errors[0].message);
            },
            onSuccess: (data) => {
              cb?.(data);
              queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
              });
              message.success("Updated tag successfully");
            },
          }
        );
        return;
      }
      mutationCreateTag(form, {
        onError: (error) => {
          console.log(error);
          message.error("Created tag failed!");
        },
        onSuccess: (data) => {
          cb?.(data);
          queryClient.invalidateQueries({
            queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
          });
          message.success("Created tag successfully");
        },
      });
    },
    [mutationCreateTag, mutationUpdateTag, queryClient]
  );

  return {
    isLoading: isCreateTagPending || isUpdateTagPending,
    onCreateOrUpdateTag,
  };
};
