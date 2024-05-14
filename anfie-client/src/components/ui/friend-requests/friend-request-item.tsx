import { Avatar, Button } from "antd";
import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";
type TProps = {
  friendRequest: TFriendRequest;
  onShowFriendRequestModal?: () => void;
  onClick?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
};
const FriendRequestItem = ({
  friendRequest,
  onClick,
  onAccept,
  onReject,
}: TProps) => {
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
      <div className="flex flex-col gap-4 ml-4">
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
    </div>
  );
};

export default FriendRequestItem;
