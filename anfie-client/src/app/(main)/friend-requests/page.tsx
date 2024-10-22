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

  const {
    onAcceptFriendRequest,
    onRejectFriendRequest,
    onCancelFriendRequest,
  } = useMutationFriendRequest();

  const onAccept = useCallback(() => {
    console.log(selectedFriendRequest);

    onAcceptFriendRequest({
      requestId: selectedFriendRequest?.id.toString() || "",
    });
  }, [onAcceptFriendRequest, selectedFriendRequest]);

  const onReject = useCallback(() => {
    onRejectFriendRequest({
      requestId: selectedFriendRequest?.id.toString() || "",
    });
  }, [onRejectFriendRequest, selectedFriendRequest]);

  const onCancel = useCallback(() => {
    onCancelFriendRequest({
      requestId: selectedFriendRequest?.id.toString() || "",
    });
  }, [onCancelFriendRequest, selectedFriendRequest]);

  return (
    <div className="w-[calc(100%-250px)] flex items-center justify-center flex-col">
      <h1 className="text-center text-blue-600 my-4">Friend Requests</h1>
      {friendRequests.map((friendRequest) => (
        <FriendRequestItem
          key={friendRequest.id}
          friendRequest={friendRequest}
          onClick={() => {
            setSelectedFriendRequest(friendRequest);
          }}
          onAccept={onAccept}
          onReject={onReject}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export default FriendRequestPage;
