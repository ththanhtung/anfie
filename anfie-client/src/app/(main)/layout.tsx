import { LayoutMain } from "@/components";
import { SocketProvider } from "@/configs";
import React, { PropsWithChildren } from "react";

const ConversationLayout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutMain>
      <SocketProvider>{children}</SocketProvider>
    </LayoutMain>
  );
};

export default ConversationLayout;
