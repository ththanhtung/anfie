"use client";
import { userInfoStoreAtom } from "@/stores";
import { _common, _formatDay } from "@/utils";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Carousel, Spin, Image } from "antd";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

type TProps = {
  messages: TMessage[] | TGroupMessage[];
  totalMessages: number;
  isFetchingNextPage: boolean;
  fetchNextPage: any;
};
const MessageContainer = ({
  messages,
  totalMessages,
  isFetchingNextPage,
  fetchNextPage,
}: TProps) => {
  const { ref, inView } = useInView();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  const user = useAtomValue(userInfoStoreAtom);
  const reverseMessages = [...messages].reverse() as
    | TMessage[]
    | TGroupMessage[];

  const mapMessages = (
    message: TMessage | TGroupMessage,
    index: number,
    messages: TMessage[] | TGroupMessage[]
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const showMessageHeader =
      messages?.length === index + 1 ||
      currentMessage?.userId !== nextMessage?.userId;

    const isMessageMine = message?.userId === user?.userId;

    return (
      <div
        key={message.id}
        className={`flex gap-5 items-center mb-1 ${
          isMessageMine ? "message-container-mine" : ""
        } `}
      >
        {showMessageHeader && !isMessageMine ? (
          <Avatar
            icon={<UserOutlined />}
            size="default"
            className="cursor-pointer"
          />
        ) : (
          <></>
        )}
        {showMessageHeader ? (
          <div className="flex-col message-item-details">
            <div className="p-2 bg-slate-200 w-fit rounded-md message-item-container-body max-w-[400px]">
              {message?.content}
              {message?.medias?.length > 0 && (
                <div className="w-full">
                  <Carousel arrows infinite={false} className="text-center">
                    {message?.medias?.map((media) => (
                      <div key={media.id}>
                        <Image
                          src={media.url}
                          width={300}
                          height={300}
                          alt={media.key}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 mt-1">
              {!isMessageMine ? (
                <span className="capitalize">
                  {_common.getUserFullName(message?.user)}
                </span>
              ) : (
                <></>
              )}
              <span className="text-[.7rem]">
                {_formatDay.formatDDMMYYYYHH(message?.created_at)}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-fit ml-[52px] bg-slate-200 rounded-md m-0 p-2 message-item-container-body">
            {message?.content}
            {message?.medias?.length > 0 && (
              <div className="w-full">
                <Carousel arrows infinite={false} className="text-center">
                  {message?.medias?.map((media) => (
                    <div key={media.id}>
                      <Image
                        src={media.url}
                        width={300}
                        height={300}
                        alt={media.key}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const autoScroll = () => {
    if (typeof window !== "undefined") {
      if (containerRef?.current) {
        const container = containerRef.current;
        const newMessage = container?.lastElementChild as HTMLDivElement;

        if (newMessage) {
          const newMessageStyle = getComputedStyle?.(newMessage);
          const newMessageMargin = parseInt(newMessageStyle.marginBottom);
          const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

          const visibleHeight = container.offsetHeight;
          const containerHeight = container.scrollHeight;
          const scrollOffset = container.scrollTop + visibleHeight;

          if (containerHeight - newMessageHeight <= scrollOffset) {
            container.scrollTop = containerHeight;
          }
        }
      }
    }
  };

  useEffect(() => {
    autoScroll();
  }, [messages]);

  return (
    <div ref={containerRef} className="px-6 py-4 h-full overflow-y-scroll">
      {messages?.length > 9 && messages?.length !== totalMessages && (
        <div ref={ref} />
      )}
      {isFetchingNextPage && (
        <div className="text-center py-2">
          <Spin size="large" />
        </div>
      )}
      {reverseMessages.map(mapMessages)}
    </div>
  );
};

export default MessageContainer;
