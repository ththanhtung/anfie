import { LayoutMain } from "@/components";
import { SocketProvider } from "@/configs";
import React, { PropsWithChildren } from "react";

const ConversationLayout = ({ children }: PropsWithChildren) => {
  return (
    <SocketProvider>
      <LayoutMain>{children}</LayoutMain>
    </SocketProvider>
  );
};

export default ConversationLayout;
