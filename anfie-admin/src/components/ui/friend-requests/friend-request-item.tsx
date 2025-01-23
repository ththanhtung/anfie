import { userInfoStoreAtom } from "@/stores";
import { Avatar, Button } from "antd";
import { useAtomValue } from "jotai";
import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";
type TProps = {
  friendRequest: TFriendRequest;
  onClick?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
};
const FriendRequestItem = ({
  friendRequest,
  onClick,
  onAccept,
  onReject,
  onCancel,
}: TProps) => {
  const currentUser = useAtomValue(userInfoStoreAtom);

  return (
    <div
      className={`conversation-item hover: shadow-md hover:scale-[1.02] w-[800px]`}
      onClick={onClick}
    >
      <div className="flex">
        <div className="w-[64px]">
          <Avatar icon={<FaEnvelopeOpenText size={28} />} size="large" />
        </div>
        <div className="item-body ml-6">
          <p className="text-black font-semibold text-2xl capitalize ">
            {friendRequest?.sender?.firstName +
              " " +
              friendRequest?.sender?.lastName}
          </p>
        </div>
      </div>
      {currentUser.userId !== friendRequest.senderId ? (
        <div className="flex gap-4 ml-4">
          <Button
            className=""
            type="primary"
            shape="round"
            style={{ backgroundColor: "#87d068" }}
            size="large"
            onClick={onAccept}
          >
            accept
          </Button>
          <Button
            className=""
            type="primary"
            shape="round"
            style={{ backgroundColor: "red" }}
            size="large"
            onClick={onReject}
          >
            reject
          </Button>
        </div>
      ) : (
        <Button
          className="ml-4"
          type="primary"
          shape="round"
          style={{ backgroundColor: "red" }}
          size="large"
          onClick={onCancel}
        >
          cancel
        </Button>
      )}
    </div>
  );
};

export default FriendRequestItem;
