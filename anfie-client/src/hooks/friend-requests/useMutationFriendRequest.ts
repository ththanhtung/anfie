import { mutationKeys } from "@/constants";
import { friendRequestsService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useCallback } from "react";

export const useMutationFriendRequest = () => {
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
      mutationKey: [mutationKeys.MUTATION_ACCEPT_CONVERSATION_REQUEST],
      mutationFn: ({ requestId }) =>
        friendRequestsService.acceptRequest(requestId),
    });

  const { mutate: mutationRejectFriendRequest, isPending: isRejectPending } =
    useMutation<any, TResponseError, { requestId: string }>({
      mutationKey: [mutationKeys.MUTATION_ACCEPT_CONVERSATION_REQUEST],
      mutationFn: ({ requestId }) =>
        friendRequestsService.rejectRequest(requestId),
    });

  const onCreateFriendRequest = useCallback(
    ({ form, cb }: TCreateFriendRequestParams) => {
      mutationCreateFriendRequest(
        { form },
        {
          onSuccess: () => {
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
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationAcceptFriendRequest]
  );

  const onRejectFriendRequest = useCallback(
    ({ requestId, cb }: TAcceptFriendRequest) => {
      mutationRejectFriendRequest(
        { requestId },
        {
          onSuccess: () => {
            cb?.();
          },
          onError: (error) => {
            message.error(error.response.data.errors[0].message);
          },
        }
      );
    },
    [mutationRejectFriendRequest]
  );

  return {
    onCreateFriendRequest,
    onAcceptFriendRequest,
    onRejectFriendRequest,
    isCreateFriendRequestPending,
    isAcceptPending,
    isRejectPending,
  };
};
