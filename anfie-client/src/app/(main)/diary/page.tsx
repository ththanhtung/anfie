"use client";
import {
  ConversationItem,
  LayoutDiary,
  MessagePanel,
  PostForm,
  PostItem,
  PostModal,
} from "@/components";
import { EConversationTypes } from "@/constants";
import { useListInfiniteConversations, useListInfinitePosts } from "@/hooks";
import { Divider, List } from "antd";
import React, { useCallback, useRef } from "react";

const DiaryPage = () => {
  const { posts } = useListInfinitePosts();
  const { conversations } = useListInfiniteConversations();
  const [valueChecked, setValueChecked] = React.useState<string>();
  const [selectedConversation, setSelectedConversation] =
    React.useState<TConversation>();
  const ref = useRef<TModalRef>(null);

  console.log({ posts });
  const onAddPost = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const recentConversations = useCallback(() => {
    return (
      <div className="h-[100vh] flex flex-col justify-between">
        <div>
          <Divider>Recent</Divider>
          <List
            dataSource={conversations}
            renderItem={(item: TConversation) => (
              <ConversationItem
                username={item?.recipient?.email}
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
        <div className="h-1/2">
          <MessagePanel
            conversation={selectedConversation}
            type={EConversationTypes.PRIVATE}
          />
        </div>
      </div>
    );
  }, [conversations, selectedConversation, valueChecked]);

  const renderLeft = useCallback(() => {
    return (
      <div className="w-[80%] mx-auto">
        <h1 className="text-center text-blue-600 my-4">Diary</h1>
        <PostForm onAddPost={onAddPost} />
        <List dataSource={posts} renderItem={(item: TPost) => <PostItem />} />
        <PostModal ref={ref} />
      </div>
    );
  }, [onAddPost, posts]);
  return (
    <LayoutDiary renderLeft={renderLeft()}>{recentConversations()}</LayoutDiary>
  );
};

export default DiaryPage;
