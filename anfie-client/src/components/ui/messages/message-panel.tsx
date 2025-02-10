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
import {
  AddRecipientsModal,
  CreateGroupModal,
  LeaveGroupModal,
  ShowAvatarModal,
} from "@/components";
import { useAtomValue } from "jotai";
import { userInfoStoreAtom } from "@/stores";

type TProps = {
  type: EConversationTypes;
  conversation?: TConversation;
  group?: TGroupConversation;
  onCreate?: (title: string, userIds: string[]) => void;
  onLeave?: () => void;
  onAddRecipients?: (params: TAddRecipientsToGroupParams) => void;
  onCreateFriendRequest?: () => void;
  onReport?: (conversationId: string) => void;
};
const MessagePanel = ({
  conversation,
  group,
  type,
  onCreate,
  onLeave,
  onAddRecipients,
  onCreateFriendRequest,
  onReport,
}: TProps) => {
  // console.log({ conversation, group, type });

  const currentUser = useAtomValue(userInfoStoreAtom);
  const createGroupRef = useRef<TModalRef>(null);
  const leaveGroupRef = useRef<TModalRef>(null);
  const addRecipientsRef = useRef<TModalRef>(null);
  const showAvatarRef = useRef<TModalRef>(null);

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

  const onShowAddRecipientsModal = () => {
    addRecipientsRef.current?.showModal();
  };

  const onShowAvatar = () => {
    showAvatarRef.current?.showModal();
  };

  const onEndConversation = () => {
    onLeave?.();
  };
  const sentMessage = async ({ content, medias }: TMessageForm) => {
    if (Number(Boolean(content)) + Number(Boolean(medias)) === 0) {
      return;
    }

    const formData = new FormData();

    if (content) {
      const trimmedContent = content.trim();
      if (!trimmedContent) return;
      formData.append("content", trimmedContent);
    }

    if (Array.isArray(medias?.fileList)) {
      for (const file of medias.fileList) {
        if (file.originFileObj) {
          formData.append("medias", file.originFileObj);
        }
      }
    }

    if (type === EConversationTypes.PRIVATE) {
      onCreateMessage({
        conversationId: conversation?.id?.toString() || "",
        form: formData,
      });
    } else {
      onCreateGroupMessage({
        groupId: group?.id?.toString() || "",
        form: formData,
      });
    }
  };

  const recipient =
    conversation?.creatorId === currentUser.userId
      ? conversation?.recipient
      : conversation?.creator;

  return (
    <>
      <div className="w-full h-full bg-white rounded-md flex flex-col justify-between">
        <MessagePanelHeader
          conversation={conversation}
          recipient={recipient ?? ({} as TUser)}
          onCreate={onCreateGroup}
          onLeave={onLeaveGroup}
          onReport={(id) => {
            onReport?.(id);
          }}
          onAddRecipients={onShowAddRecipientsModal}
          onShowAvatar={onShowAvatar}
          onEndConversation={onEndConversation}
          onCreateFriendRequest={onCreateFriendRequest}
          type={type}
          recipientName={
            type === EConversationTypes.PRIVATE
              ? _common.getUserFullName(
                  currentUser.userId === conversation?.creatorId.toString()
                    ? conversation?.recipient!
                    : conversation?.creator!
                )
              : group?.title || ""
          }
          group={group}
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
      <CreateGroupModal
        ref={createGroupRef}
        onCreate={onCreate}
        currentConversation={conversation}
      />
      <LeaveGroupModal
        ref={leaveGroupRef}
        onOk={() => {
          onLeave?.();
        }}
      />
      <AddRecipientsModal
        ref={addRecipientsRef}
        onAdd={onAddRecipients}
        groupId={group?.id?.toString() || ""}
      />

      <ShowAvatarModal ref={showAvatarRef} conversation={conversation} />
    </>
  );
};

export default MessagePanel;
