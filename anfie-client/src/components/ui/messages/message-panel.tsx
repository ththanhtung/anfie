"use client";

import { useListInfiniteMessages, useMutationMessage } from "@/hooks";
import React, { useContext, useEffect } from "react";
import MessagePanelHeader from "./message-panel-header";
import MessagePanelFooter from "./message-panel-footer";
import MessageContainer from "./message-container";

type TProps = {
  conversation?: TConversation;
};
const MessagePanel = ({ conversation }: TProps) => {
  const { messages, total, isFetchingNextPage, fetchNextPage } =
    useListInfiniteMessages(conversation?.id?.toString());

  console.log({ messages });

  const { onCreateMessage } = useMutationMessage();

  const sentMessage = async ({ content }: TMessageForm) => {
    if (!content) return;

    const trimmedContent = content?.trim();
    if (!trimmedContent) return;
    const form = new FormData();
    form.append("content", trimmedContent);

    // TODO
    // attach media to form
    // sent message
    onCreateMessage({
      conversationId: conversation?.id?.toString() || "",
      form,
    });
  };

  return (
    <div className="w-full h-full bg-white rounded-md flex flex-col justify-between">
      <MessagePanelHeader recipientName={conversation?.recipient.email || ""} />
      <MessageContainer
        messages={messages}
        totalMessages={total}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <div className="px-6">
        <MessagePanelFooter sendMessage={sentMessage} />
      </div>
    </div>
  );
};

export default MessagePanel;
