import { mutationKeys, queryKeys } from "@/constants";
import { messagesService, postService } from "@/services";
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

  const onCreatePost = useCallback(
    ({ form, cb }: TCreatePostParams) => {
      mutationCreatePost(
        { form },
        {
          onSuccess: () => {
            cb?.();
          },
          onError: (error) => {
            message.error(error.message);
          },
        }
      );
    },
    [mutationCreatePost]
  );

  return {
    onCreatePost,
    isCreatePostPending,
  };
};
