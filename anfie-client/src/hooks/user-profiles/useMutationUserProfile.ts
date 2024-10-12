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
  } = useMutation<any, TResponseError, { form: TUpdateUserProfileForm }>({
    mutationKey: [mutationKeys.MUTATION_UPDATE_USER_PROFILE],
    mutationFn: ({ form }) => userProfilesService.patchUpdateUserProfile(form),
  });

  const { mutate: mutationFindNewFriend, isPending: isFindNewFriendPending } =
    useMutation<any, TResponseError>({
      mutationKey: [mutationKeys.MUTATION_FIND_NEW_FRIEND],
      mutationFn: () => userProfilesService.postFindNewFriends(),
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
  const onFindNewFriend = useCallback(
    ({ cb }: TFindNewFriendParams) => {
      mutationFindNewFriend(undefined, {
        onError: (error) => {
          message.error(error.message);
        },
        onSuccess: (data) => {
          cb?.();
          message.success("Find new friend successfully");
        },
      });
      return;
    },
    [mutationFindNewFriend]
  );

  return {
    isLoading: isUpdateUserProfilePending,
    onUpdateUserProfile,
    onFindNewFriend,
  };
};
