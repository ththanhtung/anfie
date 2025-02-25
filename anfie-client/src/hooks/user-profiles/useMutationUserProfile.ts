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

  const {
    mutate: mutationDeleteProfileMedia,
    isPending: isDeleteProfileMediaPending,
  } = useMutation<
    any,
    TResponseError,
    {
      ids: string[];
    }
  >({
    mutationKey: [mutationKeys.MUTATION_DELETE_PROFILE_MEDIA],
    mutationFn: ({ ids }) => userProfilesService.deleteUserProfileMedia(ids),
  });

  const {
    mutate: mutationUpdateProfileMedia,
    isPending: isUpdateProfileMediaPending,
  } = useMutation<any, TResponseError, { form: FormData }>({
    mutationKey: [mutationKeys.MUTATION_UPDATE_PROFILE_MEDIA],
    mutationFn: ({ form }) => userProfilesService.updateUserProfileMedia(form),
  });

  const onUpdateUserProfile = useCallback(
    ({ form, cb }: TUpdateUserProfileParams) => {
      mutationUpdateUserProfile(
        { form },
        {
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
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
          message.error(error.response.data.errors[0].message);
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
  const onDeleteProfileMedia = useCallback(
    ({ ids, cb }: TDeleteProfileMediaParams) => {
      mutationDeleteProfileMedia(
        { ids },
        {
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
          onSuccess: (data) => {
            cb?.();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_USER_PROFILE],
            });
            message.success("Deleted profile media successfully");
          },
        }
      );
      return;
    },
    [mutationDeleteProfileMedia, queryClient]
  );

  const onUpdateProfileMedia = useCallback(
    ({ form, cb }: TUpdateProfileMediaParams) => {
      mutationUpdateProfileMedia(
        { form },
        {
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
          onSuccess: (data) => {
            cb?.();
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_USER_PROFILE],
            });
            message.success("Updated profile media successfully");
          },
        }
      );
      return;
    },
    [mutationUpdateProfileMedia, queryClient]
  );

  return {
    isLoading:
      isUpdateUserProfilePending ||
      isDeleteProfileMediaPending ||
      isUpdateProfileMediaPending,
    onUpdateUserProfile,
    onFindNewFriend,
    onDeleteProfileMedia,
    onUpdateProfileMedia,
  };
};
