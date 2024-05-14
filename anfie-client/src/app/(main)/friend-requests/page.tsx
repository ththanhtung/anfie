"use client";
import FriendRequestItem from "@/components/ui/friend-requests/friend-request-item";
import {
  useListInfiniteFriendRequests,
  useMutationFriendRequest,
} from "@/hooks";
import { List } from "antd";
import React, { useCallback, useRef } from "react";

const FriendRequestPage = () => {
  const { friendRequests } = useListInfiniteFriendRequests();
  const ref = useRef<TModalRef>(null);
  const [selectedFriendRequest, setSelectedFriendRequest] =
    React.useState<TFriendRequest>();

  const { onAcceptFriendRequest, onRejectFriendRequest } =
    useMutationFriendRequest();

  const onShowFriendRequestModal = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const onAccept = useCallback(() => {
    onAcceptFriendRequest({
      requestId: selectedFriendRequest?.id.toString() || "",
    });
  }, [onAcceptFriendRequest, selectedFriendRequest?.id]);

  const onReject = useCallback(() => {
    onRejectFriendRequest({
      requestId: selectedFriendRequest?.id.toString() || "",
    });
  }, [onRejectFriendRequest, selectedFriendRequest?.id]);

  return (
    <div className="w-[calc(100%-250px)] flex items-center justify-center flex-col">
      <h1 className="text-center text-blue-600 my-4">Friend Requests</h1>
      <List
        dataSource={friendRequests}
        renderItem={(message) => (
          <FriendRequestItem
            friendRequest={message}
            onClick={() => {
              setSelectedFriendRequest(message);
            }}
            onShowFriendRequestModal={onShowFriendRequestModal}
            onAccept={onAccept}
            onReject={onReject}
          />
        )}
      />
    </div>
  );
};

export default FriendRequestPage;
