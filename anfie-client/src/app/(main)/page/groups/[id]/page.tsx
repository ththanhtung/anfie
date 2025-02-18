"use client";
import {
  ConversationItem,
  DeletePostModal,
  LayoutDiary,
  MessagePanel,
  PostForm,
  PostItem,
  PostModal,
} from "@/components";
import PostCommentsModel from "@/components/ui/diaries/post-comments-model";
import { EConversationTypes, EReportTicketType } from "@/constants";
import {
  useGetDetailsGroup,
  useListInfiniteConversations,
  useListInfinitePosts,
  useMutationPost,
  useMutationReportTicket,
} from "@/hooks";
import { userInfoStoreAtom } from "@/stores";
import { Divider, List } from "antd";
import { on } from "events";
import { useAtomValue } from "jotai";
import React, { useCallback, useRef } from "react";

const GroupPage = ({ params }: TDetailPage) => {
  const { posts } = useListInfinitePosts(params?.id);
  const { conversations } = useListInfiniteConversations();
  const [valueChecked, setValueChecked] = React.useState<string>();
  const [selectedConversation, setSelectedConversation] =
    React.useState<TConversation>();
  const ref = useRef<TModalRef>(null);
  const commentRef = useRef<TModalRef>(null);
  const deletePostRef = useRef<TModalRef>(null);
  const { group } = useGetDetailsGroup(params?.id);
  const { onCreateReportTicket, isLoading } = useMutationReportTicket();
  const [selectedPost, setSelectedPost] = React.useState<TPost>();
  const currentUser = useAtomValue(userInfoStoreAtom);
  const { onDeletePost, isDeletePostPending } = useMutationPost();

  const onReport = useCallback(() => {
    onCreateReportTicket({
      form: {
        postId: selectedPost?.id,
        reporteeId: selectedPost?.authorId ?? "",
        content: "",
        type: EReportTicketType.POST,
      },
    });
  }, [onCreateReportTicket, selectedPost?.authorId, selectedPost?.id]);

  const onAddPost = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const onShowComments = useCallback(() => {
    commentRef.current?.showModal();
  }, []);

  const onShowDelete = useCallback(() => {
    deletePostRef.current?.showModal();
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
          return (
            <PostItem
              key={item.id}
              post={item}
              onReport={onReport}
              onClick={() => {
                setSelectedPost(item);
              }}
              onShowComments={onShowComments}
              onShowDelete={onShowDelete}
            />
          );
        })}
        <PostModal ref={ref} groupId={params?.id} />
        <PostCommentsModel ref={commentRef} postId={selectedPost?.id ?? ""} />
        <DeletePostModal
          ref={deletePostRef}
          isLoading={isDeletePostPending}
          onOk={() => {
            onDeletePost({
              postId: selectedPost?.id ?? "",
              cb: () => {
                deletePostRef.current?.closeModal();
              },
            });
          }}
        />
      </div>
    );
  }, [
    group?.title,
    isDeletePostPending,
    onAddPost,
    onDeletePost,
    onReport,
    onShowComments,
    onShowDelete,
    params?.id,
    posts,
    selectedPost?.id,
  ]);
  return (
    <LayoutDiary renderLeft={renderLeft()}>{recentConversations()}</LayoutDiary>
  );
};

export default GroupPage;
