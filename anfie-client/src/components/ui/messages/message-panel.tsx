"use client";

import {
  useListInfiniteGroupMessages,
  useListInfiniteMessages,
  useMutationGroupMessage,
  useMutationMessage,
} from "@/hooks";
import React from "react";
import MessagePanelHeader from "./message-panel-header";
import MessagePanelFooter from "./message-panel-footer";
import MessageContainer from "./message-container";
import { _common } from "@/utils";
import { EConversationTypes } from "@/constants";

type TProps = {
  type: EConversationTypes;
  conversation?: TConversation;
  group?: TGroupConversation;
};
const MessagePanel = ({ conversation, group, type }: TProps) => {
  console.log({ conversation, group, type });

  const {
    messages: conversationMessages,
    total,
    isFetchingNextPage,
    fetchNextPage,
  } = useListInfiniteMessages(conversation?.id?.toString());

  const {
    groupMessages,
    total: totalGroupMessages,
    isFetchingNextPage: isFetchingNextPageGroupMessages,
    fetchNextPage: fetchNextPageGroupMessages,
  } = useListInfiniteGroupMessages(group?.id?.toString());

  const { onCreateMessage } = useMutationMessage();
  const { onCreateGroupMessage } = useMutationGroupMessage();

  const sentMessage = async ({ content }: TMessageForm) => {
    if (!content) return;

    const trimmedContent = content?.trim();
    if (!trimmedContent) return;
    const form = new FormData();
    form.append("content", trimmedContent);

    // TODO
    // attach media to form
    // sent message
    if (type === EConversationTypes.PRIVATE) {
      onCreateMessage({
        conversationId: conversation?.id?.toString() || "",
        form,
      });
    } else {
      onCreateGroupMessage({
        groupId: group?.id?.toString() || "",
        form,
      });
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-md flex flex-col justify-between">
      <MessagePanelHeader
        recipientName={
          type === EConversationTypes.PRIVATE
            ? _common.getUserFullName(conversation?.recipient!)
            : group?.title || ""
        }
      />
      <MessageContainer
        messages={
          type === EConversationTypes.PRIVATE
            ? conversationMessages
            : groupMessages
        }
        totalMessages={
          type === EConversationTypes.PRIVATE
            ? total || 0
            : totalGroupMessages || 0
        }
        isFetchingNextPage={
          type === EConversationTypes.PRIVATE
            ? isFetchingNextPage
            : isFetchingNextPageGroupMessages
        }
        fetchNextPage={
          type === EConversationTypes.PRIVATE
            ? fetchNextPage
            : fetchNextPageGroupMessages
        }
      />
      <div className="px-6">
        <MessagePanelFooter sendMessage={sentMessage} />
      </div>
    </div>
  );
};

export default MessagePanel;
