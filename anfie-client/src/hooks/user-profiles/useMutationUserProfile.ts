import { useCallback } from "react";
import { message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "@/constants";
import { userProfilesService } from "@/services";

export const useMutationUserProfile = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutationUpdateUserProfile,
    isPending: isUpdateUserProfilePending,
  } = useMutation<any, TResponseError, { form: TUserProfileForm }>({
    mutationKey: [mutationKeys.MUTATION_UPDATE_TAG],
    mutationFn: ({ form }) => userProfilesService.patchUpdateUserProfile(form),
  });

  const onUpdateUserProfile = useCallback(
    ({ form, cb }: TUpdateUserProfileParams) => {
      mutationUpdateUserProfile(
        { form },
        {
          onError: (error) => {
            message.error(error.message);
          },
          onSuccess: (data) => {
            cb?.();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_TAGS],
            });
            message.success("Updated userProfile successfully");
          },
        }
      );
      return;
    },
    [mutationUpdateUserProfile, queryClient]
  );

  return {
    isLoading: isUpdateUserProfilePending,
    onUpdateUserProfile,
  };
};
