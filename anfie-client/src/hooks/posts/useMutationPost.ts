import { mutationKeys, queryKeys } from "@/constants";
import { postService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationPost = () => {
  const queryClient = useQueryClient();
  const { mutate: mutationCreatePost, isPending: isCreatePostPending } =
    useMutation<any, TResponseError, { form: any }>({
      mutationKey: [mutationKeys.MUTATION_CREATE_POST],
      mutationFn: ({ form }) => postService.postCreatePost(form),
    });

  const { mutate: mutationDeletePost, isPending: isDeletePostPending } =
    useMutation<any, TResponseError, { id: string }>({
      mutationKey: [mutationKeys.MUTATION_DELTE_POST],
      mutationFn: ({ id }) => postService.deletePost(id),
    });

  const onCreatePost = useCallback(
    ({ form, cb }: TCreatePostParams) => {
      mutationCreatePost(
        { form },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_POSTS],
            });
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreatePost, queryClient]
  );

  const onDeletePost = useCallback(
    ({ postId, cb }: TDeletePostParams) => {
      mutationDeletePost(
        { id: postId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_POSTS],
            });
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationDeletePost, queryClient]
  );

  return {
    onCreatePost,
    onDeletePost,
    isCreatePostPending,
    isDeletePostPending,
  };
};
