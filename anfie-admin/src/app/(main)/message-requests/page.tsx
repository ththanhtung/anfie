"use client";
import MessageRequestItem from "@/components/ui/message-request/message-request-item";
import MessageRequestModal from "@/components/ui/message-request/message-request-modal";
import {
  useListInfiniteMessageRequests,
  useMutationMessageRequest,
} from "@/hooks";
import { List } from "antd";
import React, { useCallback, useRef } from "react";

const MessageRequestPage = () => {
  const { messageRequests } = useListInfiniteMessageRequests();
  const ref = useRef<TModalRef>(null);
  const [selectedMessageRequest, setSelectedMessageRequest] =
    React.useState<TMessageRequest>();

  const { onAcceptMessageRequest, onRejectMessageRequest } =
    useMutationMessageRequest();

  const onShowMessageRequestModal = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const onAccept = useCallback(() => {
    onAcceptMessageRequest({
      requestId: selectedMessageRequest?.id.toString() || "",
    });
  }, [onAcceptMessageRequest, selectedMessageRequest?.id]);

  const onReject = useCallback(() => {
    onRejectMessageRequest({
      requestId: selectedMessageRequest?.id.toString() || "",
    });
  }, [onRejectMessageRequest, selectedMessageRequest?.id]);

  return (
    <div className="w-[calc(100%-250px)] flex items-center justify-center flex-col">
      <h1 className="text-center text-blue-600 my-4">Message Requests</h1>
      <List
        dataSource={messageRequests}
        renderItem={(message) => (
          <MessageRequestItem
            messageRequest={message}
            onClick={() => {
              setSelectedMessageRequest(message);
            }}
            onShowMessageRequestModal={onShowMessageRequestModal}
            onAccept={onAccept}
            onReject={onReject}
          />
        )}
      />
      <MessageRequestModal
        ref={ref}
        messageRequest={selectedMessageRequest!}
        onAccept={onAccept}
        onReject={onReject}
      />
    </div>
  );
};

export default MessageRequestPage;
