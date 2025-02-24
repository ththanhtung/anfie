"use client";
import { images } from "@/constants";
import { getName } from "@/helper";
import { Button, Carousel, Flex, Modal, Tooltip, Tag } from "antd";
import React, {
  ReactElement,
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

  // Prepare images: if medias exist, use them; otherwise fallback to profilePictureUrl.
  const profileImages = (matchedUser?.medias && matchedUser?.medias.length > 0
    ? matchedUser.medias
    : [{ url: matchedUser?.profilePictureUrl }]) || [images.LOGO];

  return (
    <Modal
      onCancel={closeModal}
      open={isModalOpen}
      width={400}
      closeIcon={false}
      footer={null}
      closable={false}
      modalRender={(modal) => {
        if (React.isValidElement(modal)) {
          return React.cloneElement(modal as ReactElement, {
            style: {
              ...modal?.props.style,
              borderRadius: "15px",
              padding: 0,
            },
          });
        }
        return modal;
      }}
    >
      <div className="relative flex h-[500px] w-[400px] items-center justify-center">
        <div className="relative h-full w-full rounded-2xl shadow-md">
          {/* Carousel for sliding through images */}
          <Carousel arrows infinite={false} effect="scrollx">
            {profileImages.map((media, index) => (
              <div key={index}>
                <div
                  className="h-[500px] w-[400px] rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${media.url})`,
                  }}
                />
              </div>
            ))}
          </Carousel>

          {/* Overlay with gradient, text, and buttons */}
          <div className="absolute left-0 top-[50%] h-[50%] w-full overflow-hidden rounded-2xl bg-gradient-to-t from-black flex flex-col items-center justify-end py-7">
            <h4 className="z-10 mb-2 text-3xl font-semibold capitalize text-stone-50">
              {getName(matchedUser)}
            </h4>
            <p className="z-10 block text-center text-stone-50">
              {`Why we think you two a good match: ${matchedReason}`}
            </p>

            {matchedUser?.bio && (
              <p className="text-white">{`About ${matchedUser.user?.firstName}: ${matchedUser?.bio}`}</p>
            )}
            <Flex gap="4px 0" wrap>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
            </Flex>
            <div className="mt-3 flex gap-[150px]">
              <Tooltip title="reject" key="reject" className="z-10">
                <Button
                  shape="circle"
                  icon={<ImCross size={22} />}
                  className="border-transparent shadow-none"
                  onClick={onReject}
                  style={{ backgroundColor: "red" }}
                  size="large"
                  loading={isPending}
                />
              </Tooltip>
              <Tooltip title="accept" key="accept" className="z-10">
                <Button
                  shape="circle"
                  icon={<FaCheck size={22} />}
                  className="border-transparent shadow-none"
                  onClick={onAccept}
                  style={{ backgroundColor: "#52DD68" }}
                  size="large"
                  loading={isPending}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(forwardRef(ConversationRequestModal));
