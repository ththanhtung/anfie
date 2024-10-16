"use client";
import { getName } from "@/helper";
import { Button, Modal, Tooltip } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
import { FaCheck } from "react-icons/fa6";
import { Image } from "antd";
import { useUserProfile } from "@/hooks";
import { FIFTEEN_MINUTES } from "@/constants";
import { _formatDay } from "@/utils";
type TProps = {
  onReport?: () => void;
  conversation?: TConversation;
};
const ShowAvatarModal = (
  { conversation, onReport }: TProps,
  ref: Ref<TModalRef>
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      showModal,
      closeModal,
    }),
    []
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { userProfile } = useUserProfile();
  const createdAt = conversation?.created_at
    ? new Date(conversation?.created_at)
    : new Date();
  const conversationDuration = (Date.now() - createdAt.getTime()) / 1000;
  const unlockTime = calculateExpirationDate(createdAt, FIFTEEN_MINUTES);

  return (
    <Modal
      onCancel={closeModal}
      open={isModalOpen}
      width={545}
      closeIcon={false}
      footer={null}
    >
      <div>
        {conversationDuration > FIFTEEN_MINUTES ? (
          <div className="mt-3 flex gap-4 flex-col">
            <Image
              alt="avatar"
              width={500}
              src={
                userProfile?.user.profilePictureUrl ??
                "https://cdn.icon-icons.com/icons2/1392/PNG/512/avatar_96675.png"
              }
            />
            <Tooltip
              title="It is supposed to display another person's photo. If it does not, please report it to us."
              key={"accept"}
            >
              <Button
                icon={<FaCheck size={22} />}
                className="shadow-none flex items-center justify-center"
                htmlType="submit"
                onClick={onReport}
                size="large"
              >
                Report User
              </Button>
            </Tooltip>
          </div>
        ) : (
          <div>
            Other person&apos;s photo will be unlock at:
            {_formatDay.formatDDMMYYYYHH(unlockTime.toISOString())}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default memo(forwardRef(ShowAvatarModal));

export function calculateExpirationDate(
  currentExpirationDate: Date | null,
  duration: number
) {
  const expiration = currentExpirationDate
    ? new Date(currentExpirationDate)
    : new Date();
  expiration.setSeconds(expiration.getSeconds() + duration);
  return expiration;
}
