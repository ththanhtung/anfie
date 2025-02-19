"use client";
import {
  ConversationItem,
  LayoutConversation,
  MessagePanel,
  ReportModal,
} from "@/components";
import { useSocketContext } from "@/configs";
import { EConversationTypes, EReportTicketType, queryKeys } from "@/constants";
import {
  useListInfiniteConversations,
  useMutationConversation,
  useMutationFriendRequest,
  useMutationGroup,
  useMutationReportTicket,
} from "@/hooks";
import { userInfoStoreAtom } from "@/stores";
import { _common } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { List } from "antd";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect } from "react";

const ConversationPage = () => {
  const currentUser = useAtomValue(userInfoStoreAtom);
  const { conversations } = useListInfiniteConversations();
  const queryClient = useQueryClient();
  const [valueChecked, setValueChecked] = React.useState<string>();
  const [selectedConversation, setSelectedConversation] =
    React.useState<TConversation>();
  const { onCreateOrUpdateGroup } = useMutationGroup();
  const { onLeaveConversation } = useMutationConversation();
  const { onCreateFriendRequest: onCreateFriendRequestMutation } =
    useMutationFriendRequest();
  const { onCreateReportTicket, isLoading } = useMutationReportTicket();
  const reportModalRef = React.useRef<TModalRef>(null);

  const onReport = useCallback(
    (value: any) => {
      onCreateReportTicket({
        form: {
          conversationId: selectedConversation?.id ?? "",
          content: value?.content ?? "",
          reporteeId:
            currentUser?.userId === selectedConversation?.recipientId
              ? selectedConversation?.creatorId
              : selectedConversation?.recipientId,
          type: EReportTicketType.CONVERSATION,
        },
        cb: () => {
          reportModalRef.current?.closeModal();
        },
      });
    },
    [
      currentUser?.userId,
      onCreateReportTicket,
      selectedConversation?.creatorId,
      selectedConversation?.id,
      selectedConversation?.recipientId,
    ]
  );

  const onShowReport = useCallback(() => {
    reportModalRef.current?.showModal();
  }, []);

  const onCreateGroup = useCallback(
    (title: string, userIds: string[]) => {
      onCreateOrUpdateGroup({
        form: {
          title,
          users: userIds,
        },
      });
    },
    [onCreateOrUpdateGroup]
  );

  const onLeave = useCallback(() => {
    onLeaveConversation({
      id: selectedConversation?.id ?? "",
      cb: () => {
        setSelectedConversation(undefined);
      },
    });
  }, [onLeaveConversation, selectedConversation?.id]);

  const onCreateFriendRequest = useCallback(() => {
    const receiverId =
      selectedConversation?.recipientId === currentUser?.userId
        ? selectedConversation?.creatorId
        : selectedConversation?.recipientId;

    onCreateFriendRequestMutation({
      form: {
        receiverId: receiverId ?? "",
      },
    });
  }, [
    currentUser?.userId,
    onCreateFriendRequestMutation,
    selectedConversation?.creatorId,
    selectedConversation?.recipientId,
  ]);

  const socket = useSocketContext();
  useEffect(() => {
    socket.on?.("connected", (payload) => {
      console.log({ payload });
    });

    socket.on?.("onMessage", (payload: TMessage) => {
      console.log({ payload });

      const queryKeyMessages = [
        queryKeys.GET_LIST_INFINITE_MESSAGES,
        {
          page: 1,
          limit: 10,
          sort: "DESC",
          order_by: "created_at",
        },
        payload?.conversationId.toString(),
      ];

      const queryKeyConversations = [
        queryKeys.GET_LIST_INFINITE_CONVERSATIONS,
        {
          page: 1,
          limit: 10,
          sort: "DESC",
          order_by: "updated_at",
        },
      ];

      queryClient.setQueryData(queryKeyMessages, (oldData: any) => {
        // Use the first page because with "DESC" the newest messages are on page 1
        const newestPage = oldData?.pages[0];

        // Create a new page object with the updated data (prepending the new message)
        const newPage = {
          ...newestPage,
          data: [payload, ...newestPage?.data],
        };

        // Create a new array of pages with the updated first page
        const newPages = oldData?.pages.map(
          (page: TResultResponse<TMessage[]>, index: number) =>
            index === 0 ? newPage : page
        );

        return {
          ...oldData,
          pages: newPages,
        };
      });

      queryClient.setQueryData(queryKeyConversations, (oldData: any) => {
        // Find the latest page
        const latestPage = oldData.pages[oldData.pages.length - 1];

        // Create a new page object with the updated data
        const conversations = latestPage?.data;

        const index = conversations.findIndex(
          (c: any) => c.id === payload.conversationId
        );

        const messageConversation = conversations[index];
        messageConversation.lastMessage = payload;

        // Create a copy of the conversations array
        const updatedConversations = [...conversations];

        // Remove the conversation at the specified index
        updatedConversations.splice(index, 1);

        // Add the messageConversation at the beginning of the array
        updatedConversations.unshift(messageConversation);

        const newPage = {
          ...latestPage,
          data: updatedConversations,
        };

        // Create a new array of pages with the updated latest page
        const newPages = oldData.pages.map(
          (page: TResultResponse<TMessage[]>, index: number) =>
            index === oldData.pages.length - 1 ? newPage : page
        );

        // Create a new data object with the updated pages
        const newData = {
          ...oldData,
          pages: newPages,
        };

        return newData;
      });
    });
    return () => {
      socket.off?.("connected");
      socket.off?.("onMessage");
    };
  }, [queryClient, socket]);

  const renderLeft = useCallback(() => {
    return (
      <div>
        <h1 className="text-center text-blue-600 my-4">Conversations</h1>
        <List
          className="p-8"
          dataSource={conversations}
          renderItem={(item: TConversation) => (
            <ConversationItem
              username={_common.getUserFullName(
                currentUser.userId === item?.creatorId.toString()
                  ? item?.recipient!
                  : item?.creator!
              )}
              lastMessage={item?.lastMessage}
              id={Math.round(Math.random() * 100000000).toString()}
              value={valueChecked}
              onClick={() => {
                console.log({ item });
                setValueChecked(item?.id);
                setSelectedConversation(item);
              }}
            />
          )}
        />
      </div>
    );
  }, [conversations, currentUser.userId, valueChecked]);
  return (
    <>
      <LayoutConversation renderLeft={renderLeft()}>
        <div className="h-[100vh]">
          <MessagePanel
            conversation={selectedConversation}
            type={EConversationTypes.PRIVATE}
            onCreate={onCreateGroup}
            onLeave={onLeave}
            onCreateFriendRequest={onCreateFriendRequest}
            onShowReport={onShowReport}
          />
        </div>
        <ReportModal
          ref={reportModalRef}
          isLoading={isLoading}
          onReport={onReport}
        />
      </LayoutConversation>
    </>
  );
};

export default ConversationPage;
