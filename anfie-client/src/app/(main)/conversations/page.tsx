"use client";
import {
  ConversationItem,
  LayoutConversation,
  MessagePanel,
} from "@/components";
import { useListInfiniteConversations } from "@/hooks";
import { List } from "antd";
import React, { useCallback } from "react";

const ConversationPage = () => {
  const { conversations, isFetchingNextPage, total, fetchNextPage, isLoading } =
    useListInfiniteConversations();
  const [valueChecked, setValueChecked] = React.useState<string>("");

  const renderLeft = useCallback(() => {
    return (
      <div>
        <h1 className="text-center text-blue-600 mb-4">Conversations</h1>
        <List
          dataSource={conversations}
          renderItem={(item: TConversation) => (
            <ConversationItem
              username={item?.recipient?.email}
              lastMessage={item?.lastMessage[0]}
            />
          )}
        />
      </div>
    );
  }, [conversations]);
  return (
    <>
      <LayoutConversation renderLeft={renderLeft()}>
        <MessagePanel />
      </LayoutConversation>
    </>
  );
};

export default ConversationPage;
