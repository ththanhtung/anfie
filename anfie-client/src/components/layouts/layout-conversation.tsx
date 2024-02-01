import { Col, Row } from "antd";
import React, { PropsWithChildren, ReactNode } from "react";
type TProps = PropsWithChildren & {
  renderLeft: ReactNode;
};
const LayoutConversation = ({ renderLeft, children }: TProps) => {
  return (
    <Row className="w-full bg-slate-100 py-4">
      <Col md={8} lg={8} className="h-full">
        {renderLeft}
      </Col>
      <Col md={12} lg={15}>
        {children}
      </Col>
    </Row>
  );
};

export default LayoutConversation;
