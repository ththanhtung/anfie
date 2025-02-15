import { mutationKeys, queryKeys } from "@/constants";
import { alleysService, commentsService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationComment = () => {
  const queryClient = useQueryClient();
  const { mutate: mutationCreateComment, isPending: isCreateCommentPending } =
    useMutation<any, TResponseError, { form: TCommentForm }>({
      mutationKey: [mutationKeys.MUTATION_CREATE_ALLEY],
      mutationFn: ({ form }) => commentsService.postCreateComment(form),
    });

  const onCreateComment = useCallback(
    ({ form, cb }: TCreateCommentParams) => {
      mutationCreateComment(
        { form },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_COMMENTS_BY_PARENT, form.parentId],
            });

            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_COMMENTS_BY_POST, form.postId],
            });

            cb?.(data);
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreateComment, queryClient]
  );

  return {
    onCreateComment,
    isCreateCommentPending,
  };
};
