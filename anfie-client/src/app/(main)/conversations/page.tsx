"use client";
import {
  ConversationItem,
  CreateGroupModal,
  LayoutConversation,
  MessagePanel,
} from "@/components";
import { useSocketContext } from "@/configs";
import { EConversationTypes, queryKeys } from "@/constants";
import { useListInfiniteConversations, useMutationGroup } from "@/hooks";
import { userInfoStoreAtom } from "@/stores";
import { _common } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { List } from "antd";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect, useRef } from "react";

const ConversationPage = () => {
  const currentUser = useAtomValue(userInfoStoreAtom);
  const { conversations } = useListInfiniteConversations();
  const queryClient = useQueryClient();
  const [valueChecked, setValueChecked] = React.useState<number>();
  const [selectedConversation, setSelectedConversation] =
    React.useState<TConversation>();
  const { onCreateOrUpdateGroup } = useMutationGroup();

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
        // Find the latest page
        const latestPage = oldData?.pages[oldData?.pages.length - 1];

        // Create a new page object with the updated data
        const newPage = {
          ...latestPage,
          data: [...latestPage?.data, payload],
        };

        // Create a new array of pages with the updated latest page
        const newPages = oldData?.pages.map(
          (page: TResultResponse<TMessage[]>, index: number) =>
            index === oldData?.pages.length - 1 ? newPage : page
        );

        // Create a new data object with the updated pages
        const newData = {
          ...oldData,
          pages: newPages,
        };

        return newData;
      });

      queryClient.setQueryData(queryKeyConversations, (oldData: any) => {
        // Find the latest page
        const latestPage = oldData.pages[oldData.pages.length - 1];

        // Create a new page object with the updated data
        const conversations = latestPage?.data;

        const index = conversations.findIndex(
          (c) => c.id === payload.conversationId
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
              id={Math.round(Math.random() * 100000000)}
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
        <div className="h-[100vh]">
          <MessagePanel
            conversation={selectedConversation}
            type={EConversationTypes.PRIVATE}
            onCreate={onCreateGroup}
          />
        </div>
      </LayoutConversation>
    </>
  );
};

export default ConversationPage;
