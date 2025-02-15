"use client";
import { Avatar, Button, Input, Modal, Space, Spin } from "antd";
import React, {
  Ref,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useListPostComment } from "@/hooks";
import { images } from "@/constants";
import { useMutationComment } from "@/hooks/comments";
import { SendOutlined } from "@ant-design/icons";
import { _common } from "@/utils";
import CommentItem from "./comment-item";
type TProps = {
  postId: string;
};

const PostCommentModal = ({ postId }: TProps, ref: Ref<TModalRef>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<TComment | null>(null);

  const {
    comments,
    refetch,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    total,
  } = useListPostComment(postId);
  const { onCreateComment } = useMutationComment();

  // Reset state when postId changes
  useEffect(() => {
    setNewComment("");
    setReplyingTo(null);
    refetch(); // Ensure comments update when postId changes
  }, [postId, refetch]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    await onCreateComment({
      form: {
        content: newComment,
        postId,
        parentId: replyingTo?.id,
      },
    });

    setNewComment("");
    setReplyingTo(null);
    refetch();
  };

  useImperativeHandle(
    ref,
    () => ({
      showModal,
      closeModal,
    }),
    []
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      onCancel={closeModal}
      open={isModalOpen}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      closeIcon={false}
      width={980}
    >
      {isCommentsLoading ? (
        <Spin size="large" />
      ) : (
        <div className="max-h-[600px] overflow-y-auto">
          {comments?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              setReplyingTo={setReplyingTo}
            />
          ))}

          {comments?.length > 9 && comments?.length !== total && (
            <Button
              type="link"
              size="small"
              onClick={() => {
                fetchNextPage();
              }}
            >
              load more
            </Button>
          )}
        </div>
      )}

      {replyingTo && (
        <div className="mb-2 flex items-center gap-2 text-sm">
          <span className="text-gray-600">
            Replying to{" "}
            <span className="font-semibold">
              {_common.getUserFullName(replyingTo.user)}
            </span>
          </span>
          <Button type="text" size="small" onClick={() => setReplyingTo(null)}>
            Cancel
          </Button>
        </div>
      )}
      <div className="mt-4 flex items-center gap-2">
        <Avatar src={images.DEFAULT_AVATAR} />
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <Input
            placeholder={
              replyingTo
                ? `Reply to ${_common.getUserFullName(replyingTo.user)}...`
                : "Write a comment..."
            }
            bordered={false}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onPressEnter={handleSubmitComment}
          />
          <Space>
            <Button
              type="text"
              icon={<SendOutlined />}
              onClick={handleSubmitComment}
            />
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(PostCommentModal);
