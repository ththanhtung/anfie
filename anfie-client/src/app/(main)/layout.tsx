import { LayoutMain } from "@/components";
import React, { PropsWithChildren } from "react";

const ConversationLayout = ({ children }: PropsWithChildren) => {
  return <LayoutMain>{children}</LayoutMain>;
};

export default ConversationLayout;
