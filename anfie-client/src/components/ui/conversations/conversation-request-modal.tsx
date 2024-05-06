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
import { ImCross } from "react-icons/im";
type TProps = {
  matchedUser?: TUserProfile;
  matchedReason: string;
  onAccept: () => void;
  onReject: () => void;
  isPending: boolean;
};
const ConversationRequestModal = (
  { matchedUser, matchedReason, onAccept, onReject, isPending }: TProps,
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

  return (
    <Modal
      onCancel={closeModal}
      open={isModalOpen}
      width={400}
      closeIcon={false}
      footer={null}
      modalRender={(modal) => {
        return React.cloneElement(modal, {
          style: {
            ...modal.props.style,
            ...{ borderRadius: 0, padding: 0 },
            borderRadius: "15px",
          },
        });
      }}
    >
      <div className="relative flex h-[500px] w-[400px] flex-col items-center justify-end rounded-2xl bg-[url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center shadow-md p-0">
        <div className="absolute left-0 top-[50%] h-[50%] w-full overflow-hidden rounded-2xl bg-gradient-to-t from-black flex flex-col items-center justify-end py-7">
          <h4 className="z-10 mb-2 text-3xl font-semibold capitalize text-stone-50">
            {getName(matchedUser)}
          </h4>
          <p className="z-10 block text-center text-stone-50">
            {matchedReason}
          </p>
          <div className="mt-3 flex gap-[150px]">
            <Tooltip title="reject" key={"reject"} className="z-10">
              <Button
                shape="circle"
                icon={<ImCross size={22} />}
                className="border-transparent shadow-none"
                htmlType="submit"
                onClick={onReject}
                style={{ backgroundColor: "red" }}
                size="large"
                loading={isPending}
              />
            </Tooltip>
            <Tooltip title="accept" key={"accept"}>
              <Button
                shape="circle"
                icon={<FaCheck size={22} />}
                className="border-transparent shadow-none"
                htmlType="submit"
                onClick={onAccept}
                style={{ backgroundColor: "#52DD68" }}
                size="large"
                loading={isPending}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(forwardRef(ConversationRequestModal));
