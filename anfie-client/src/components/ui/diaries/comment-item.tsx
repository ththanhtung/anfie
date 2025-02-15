"use client";
import { Avatar, Button } from "antd";
import React, { memo, useState } from "react";
import { images } from "@/constants";
import { useGetCommentsByParentId } from "@/hooks/comments";
import { _common, _formatDay } from "@/utils";

type TProps = {
  comment: TComment;
  setReplyingTo: React.Dispatch<React.SetStateAction<TComment | null>>;
};

const CommentItem = ({ comment, setReplyingTo }: TProps) => {
  const {
    comments: commentsChildren,
    hasNextPage,
    fetchNextPage,
    total
  } = useGetCommentsByParentId(comment.id);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <Avatar src={images.DEFAULT_AVATAR} />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-4 py-2">
            <div className="font-semibold">
              {_common.getUserFullName(comment.user)}
            </div>
            <div>{comment.content}</div>
          </div>
          <div className="flex gap-4 mt-1 text-sm text-gray-500">
            <Button
              type="link"
              size="small"
              onClick={() => setReplyingTo(comment)}
            >
              Reply
            </Button>
            <span>{_formatDay.formatDDMMYYYYHH(comment.created_at)}</span>
          </div>
        </div>
      </div>

      {commentsChildren?.length > 0 && (
        <div className="ml-12 mt-2">
          <Button type="link" onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? "Hide" : `View ${commentsChildren.length} replies`}
          </Button>

          {showReplies && (
            <div className="mt-2">
              {commentsChildren.map((reply: TComment) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  setReplyingTo={setReplyingTo}
                />
              ))}
              {commentsChildren?.length > 9 &&
                commentsChildren?.length !== total && (
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
        </div>
      )}
    </div>
  );
};

export default memo(CommentItem);
