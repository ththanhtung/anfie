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
import {
  useGetDetailsGroup,
  useListInfiniteConversations,
  useListInfinitePosts,
} from "@/hooks";
import { Divider, List } from "antd";
import React, { useCallback, useRef } from "react";

const GroupPage = ({ params }: TDetailPage) => {
  const { posts } = useListInfinitePosts(params?.id);
  const { conversations } = useListInfiniteConversations();
  const [valueChecked, setValueChecked] = React.useState<string>();
  const [selectedConversation, setSelectedConversation] =
    React.useState<TConversation>();
  const ref = useRef<TModalRef>(null);
  const { group } = useGetDetailsGroup(params?.id);

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
                id={Math.round(Math.random() * 100000000).toString()}
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
        <h1 className="text-center text-blue-600 my-4 capitalize">{`${
          (group?.title ?? "").length > 20
            ? group?.title.substring(0, 20) + "..."
            : group?.title
        } Group Page`}</h1>
        <PostForm onAddPost={onAddPost} />
        {posts.map((item: TPost) => {
          return <PostItem key={item.id} post={item} />;
        })}
        <PostModal ref={ref} groupId={params?.id} />
      </div>
    );
  }, [group?.title, onAddPost, params?.id, posts]);
  return (
    <LayoutDiary renderLeft={renderLeft()}>{recentConversations()}</LayoutDiary>
  );
};

export default GroupPage;
