import { LayoutConversation } from "@/components";
import { List } from "antd";
import React, { useCallback } from "react";

const ConversationPage = () => {
  const renderLeft = useCallback(()=>{
    <div>
      <List/>
    </div>
  },[])
  return (
    <>
      <LayoutConversation renderLeft={<p>left</p>}>
        <p>right</p>
      </LayoutConversation>
    </>
  );
};

export default ConversationPage;
