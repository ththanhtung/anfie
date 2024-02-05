"use client";
import {
  ConversationItem,
  LayoutConversation,
  MessagePanel,
} from "@/components";
import { useSocketContext } from "@/configs";
import { useListInfiniteConversations } from "@/hooks";
import { List } from "antd";
import React, { useCallback, useContext, useEffect } from "react";

const ConversationPage = () => {
  const { conversations, isFetchingNextPage, total, fetchNextPage, isLoading } =
    useListInfiniteConversations();
  const [valueChecked, setValueChecked] = React.useState<number>();
  const [selectedConversation, setSelectedConversation] =
    React.useState<TConversation>();

  const socket = useSocketContext();
  useEffect(() => {
    socket.on?.("connected", (payload) => {
      console.log({ payload });
    });
  }, [socket]);
  const renderLeft = useCallback(() => {
    return (
      <div>
        <h1 className="text-center text-blue-600 my-4">Conversations</h1>
        <List
          dataSource={conversations}
          renderItem={(item: TConversation) => (
            <ConversationItem
              username={item?.recipient?.email}
              lastMessage={item?.lastMessage}
              id={item?.id}
              value={valueChecked}
              onClick={() => {
                setValueChecked(item?.id);
                setSelectedConversation(item);
              }}
            />
          )}
        />
      </div>
    );
  }, [conversations, valueChecked]);
  return (
    <>
      <LayoutConversation renderLeft={renderLeft()}>
        <MessagePanel conversation={selectedConversation} />
      </LayoutConversation>
    </>
  );
};

export default ConversationPage;
