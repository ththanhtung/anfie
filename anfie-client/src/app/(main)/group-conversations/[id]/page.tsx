"use client";
import {
  ConversationItem,
  LayoutConversation,
  MessagePanel,
} from "@/components";
import { useSocketContext } from "@/configs";
import { EConversationTypes, queryKeys } from "@/constants";
import {
  useGetDetailsPublicGroup,
  useListInfiniteGroupConversations,
  useMutationGroup,
} from "@/hooks";
import { userInfoStoreAtom } from "@/stores";
import { _common } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { List } from "antd";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const GroupConversationDetailPage = ({ params }: TDetailPage) => {
  const queryClient = useQueryClient();
  const { publicGroup } = useGetDetailsPublicGroup(params.id);
  const currentUser = useAtomValue(userInfoStoreAtom);

  const { onLeaveGroup, onAddRecipientsToGroup } = useMutationGroup();

  useEffect(() => {
    if (!publicGroup) return;
    if (publicGroup.type === "public") {
      onAddRecipientsToGroup({
        groupId: params.id,
        form: {
          recipientIds: [currentUser.userId],
        },
      });
    }
  }, [currentUser.userId, onAddRecipientsToGroup, params.id, publicGroup]);

  useEffect(() => {
    return () => {
      onLeaveGroup({
        groupId: params.id,
      });
    };
  }, [onLeaveGroup, params.id]);

  const socket = useSocketContext();
  useEffect(() => {
    socket.on?.("connected", (payload) => {
      console.log({ payload });
    });

    socket.on?.("onGroupMessage", (payload: TGroupMessage) => {
      console.log({ payload });

      const queryKeyMessages = [
        queryKeys.GET_LIST_INFINITE_GROUP_MESSAGES,
        {
          page: 1,
          limit: 10,
          sort: "DESC",
          order_by: "created_at",
        },
        payload?.groupId.toString(),
      ];

      const queryKeyConversations = [
        queryKeys.GET_LIST_INFINITE_GROUP_CONVERSATIONS,
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
          (page: TResultResponse<TGroupMessage[]>, index: number) =>
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
          (c: TGroupConversation) => c.id === payload.groupId
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
          (page: TResultResponse<TGroupMessage[]>, index: number) =>
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
      socket.off?.("onGroupMessage");
    };
  }, [queryClient, socket]);

  return (
    <>
      <div className="h-[100vh] w-full bg-red-700">
        <MessagePanel
          group={publicGroup}
          type={EConversationTypes.GROUP}
          onAddRecipients={onAddRecipientsToGroup}
        />
      </div>
    </>
  );
};

export default GroupConversationDetailPage;
