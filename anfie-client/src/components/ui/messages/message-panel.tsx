"use client";

import {
  useListInfiniteGroupMessages,
  useListInfiniteMessages,
  useMutationGroupMessage,
  useMutationMessage,
} from "@/hooks";
import React, { useRef } from "react";
import MessagePanelHeader from "./message-panel-header";
import MessagePanelFooter from "./message-panel-footer";
import MessageContainer from "./message-container";
import { _common } from "@/utils";
import { EConversationTypes } from "@/constants";
import { CreateGroupModal, LeaveGroupModal } from "@/components";

type TProps = {
  type: EConversationTypes;
  conversation?: TConversation;
  group?: TGroupConversation;
  onCreate?: (title: string, userIds: string[]) => void;
  onLeave?: (params: TLeaveGroupParams) => void;
};
const MessagePanel = ({
  conversation,
  group,
  type,
  onCreate,
  onLeave,
}: TProps) => {
  console.log({ conversation, group, type });

  const createGroupRef = useRef<TModalRef>(null);
  const leaveGroupRef = useRef<TModalRef>(null);

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

  const onCreateGroup = () => {
    createGroupRef.current?.showModal();
  };

  const onLeaveGroup = () => {
    leaveGroupRef.current?.showModal();
  };

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
    <>
      <div className="w-full h-full bg-white rounded-md flex flex-col justify-between">
        <MessagePanelHeader
          onCreate={onCreateGroup}
          onLeave={onLeaveGroup}
          type={type}
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
      <CreateGroupModal ref={createGroupRef} onCreate={onCreate} />
      <LeaveGroupModal
        ref={leaveGroupRef}
        onOk={() => {
          onLeave?.({ groupId: group?.id?.toString() || "" });
        }}
      />
    </>
  );
};

export default MessagePanel;
