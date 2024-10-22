import { mutationKeys, queryKeys } from "@/constants";
import { friendRequestsService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationFriendRequest = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutationCreateFriendRequest,
    isPending: isCreateFriendRequestPending,
  } = useMutation<any, TResponseError, { form: TFriendRequestForm }>({
    mutationKey: [mutationKeys.MUTATION_CREATE_MESSAGE_REQUEST],
    mutationFn: ({ form }) =>
      friendRequestsService.postCreateFriendRequest(form),
  });
  const { mutate: mutationAcceptFriendRequest, isPending: isAcceptPending } =
    useMutation<any, TResponseError, { requestId: string }>({
      mutationKey: [mutationKeys.MUTATION_ACCEPT_FRIEND_REQUEST],
      mutationFn: ({ requestId }) =>
        friendRequestsService.acceptRequest(requestId),
    });

  const { mutate: mutationRejectFriendRequest, isPending: isRejectPending } =
    useMutation<any, TResponseError, { requestId: string }>({
      mutationKey: [mutationKeys.MUTATION_REJECT_FRIEND_REQUEST],
      mutationFn: ({ requestId }) =>
        friendRequestsService.rejectRequest(requestId),
    });

  const { mutate: mutationCancelFriendRequest, isPending: isCancelPending } =
    useMutation<any, TResponseError, { requestId: string }>({
      mutationKey: [mutationKeys.MUTATION_CANCEL_FRIEND_REQUEST],
      mutationFn: ({ requestId }) =>
        friendRequestsService.cancelRequest(requestId),
    });

  const onCreateFriendRequest = useCallback(
    ({ form, cb }: TCreateFriendRequestParams) => {
      mutationCreateFriendRequest(
        { form },
        {
          onSuccess: () => {
            message.success("Friend request sent successfully");
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCreateFriendRequest]
  );

  const onAcceptFriendRequest = useCallback(
    ({ requestId, cb }: TAcceptFriendRequest) => {
      mutationAcceptFriendRequest(
        { requestId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_FRIEND_REQUESTS],
            });
            message.success("Friend request accepted successfully");
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationAcceptFriendRequest, queryClient]
  );

  const onRejectFriendRequest = useCallback(
    ({ requestId, cb }: TAcceptFriendRequest) => {
      mutationRejectFriendRequest(
        { requestId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_FRIEND_REQUESTS],
            });
            message.success("Friend request rejected successfully");
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationRejectFriendRequest, queryClient]
  );

  const onCancelFriendRequest = useCallback(
    ({ requestId, cb }: TAcceptFriendRequest) => {
      mutationCancelFriendRequest(
        { requestId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.GET_LIST_INFINITE_FRIEND_REQUESTS],
            });
            message.success("Friend request cancelled successfully");
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationCancelFriendRequest, queryClient]
  );

  return {
    onCreateFriendRequest,
    onAcceptFriendRequest,
    onRejectFriendRequest,
    onCancelFriendRequest,
    isCreateFriendRequestPending,
    isAcceptPending,
    isRejectPending,
    isCancelPending,
  };
};
