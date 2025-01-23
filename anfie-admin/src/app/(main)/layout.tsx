"use client";
import { LayoutMain } from "@/components";
import ConversationRequestModal from "@/components/ui/conversations/conversation-request-modal";
import { useSocketContext } from "@/configs";
import { queryKeys } from "@/constants";
import { useMutationConversatinoRequest } from "@/hooks";
import { userInfoStoreAtom } from "@/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const ConversationLayout = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const socket = useSocketContext();
  const [conversationRequest, setConversationRequest] =
    useState<TConversationRequestResponse>();
  const [matchedUser, setMatchedUser] = useState<TUserProfile>(
    {} as TUserProfile
  );
  const currentUser = useAtomValue(userInfoStoreAtom);
  const conversationRequestModalref = useRef<TModalRef>(null);
  const counterId = useRef();
  const { onAcceptConversationRequest, onRejectConversationRequest, isPeding } =
    useMutationConversatinoRequest();

  const onAccept = useCallback(() => {
    console.log("accept");
    clearInterval(counterId.current);
    onAcceptConversationRequest({
      requestId: conversationRequest?.id.toString() || "",
    });
  }, [onAcceptConversationRequest, conversationRequest?.id]);

  const onReject = useCallback(() => {
    clearInterval(counterId.current);
    onRejectConversationRequest({
      requestId: conversationRequest?.id.toString() || "",
    });
    console.log("reject");
  }, [onRejectConversationRequest, conversationRequest?.id]);

  useEffect(() => {
    socket.on?.("connected", (payload) => {
      console.log({ payload });
    });

    socket.on?.(
      "onConversationRequestCreated",
      (payload: TConversationRequestResponse) => {
        if (payload.firstUserId === currentUser.userId) {
          setMatchedUser(payload.secondUserProfile);
        } else {
          setMatchedUser(payload.firstUserProfile);
        }

        counterId.current = setTimeout(() => {
          onRejectConversationRequest({
            requestId: payload.id.toString(),
          });
        }, 30000);

        setConversationRequest(payload);
        conversationRequestModalref.current?.showModal();
      }
    );

    socket.on?.("onConversationRequestRejected", (payload: any) => {
      conversationRequestModalref.current?.closeModal();
    });

    socket.on?.("onConversationCreated", (payload: any) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_LIST_INFINITE_CONVERSATIONS],
      });
      conversationRequestModalref.current?.closeModal();
    });

    return () => {
      socket.off?.("connected");
      socket.off?.("onMessage");
    };
  }, [currentUser.userId, onRejectConversationRequest, socket]);
  return (
    <LayoutMain>
      <ConversationRequestModal
        ref={conversationRequestModalref}
        matchedReason={conversationRequest?.matchedReason || ""}
        matchedUser={matchedUser}
        onAccept={onAccept}
        onReject={onReject}
        isPending={isPeding}
      />
      {children}
    </LayoutMain>
  );
};

export default ConversationLayout;
