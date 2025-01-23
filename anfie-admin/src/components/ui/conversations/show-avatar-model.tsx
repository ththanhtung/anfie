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
import { Image } from "antd";
import { FIFTEEN_MINUTES } from "@/constants";
import { _formatDay } from "@/utils";
import { MdReportProblem } from "react-icons/md";
import { useAtomValue } from "jotai";
import { userInfoStoreAtom } from "@/stores";
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

  const currentUser = useAtomValue(userInfoStoreAtom);
  const createdAt = conversation?.created_at
    ? new Date(conversation?.created_at)
    : new Date();
  const conversationDuration = (Date.now() - createdAt.getTime()) / 1000;
  const unlockTime = calculateExpirationDate(createdAt, FIFTEEN_MINUTES);
  const recipient =
    currentUser.userId === conversation?.creatorId
      ? conversation?.recipient
      : conversation?.creator;

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
              height={500}
              className="object-cover"
              src={
                recipient?.profilePictureUrl ??
                "https://cdn.icon-icons.com/icons2/1392/PNG/512/avatar_96675.png"
              }
            />
            <Tooltip
              title="It is supposed to display another person's photo. If it does not, please report it to us."
              key={"accept"}
            >
              <Button
                icon={<MdReportProblem />}
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
