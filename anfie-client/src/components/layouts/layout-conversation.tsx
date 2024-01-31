import { Col, Row } from "antd";
import React, { PropsWithChildren, ReactNode } from "react";
type TProps = PropsWithChildren & {
  renderLeft: ReactNode;
};
const LayoutConversation = ({ renderLeft, children }: TProps) => {
  return (
    <Row className="min-w-full">
      <Col md={8} lg={8} className="overflow-scroll h-full">
        {renderLeft}
      </Col>
      <Col md={12} lg={12}>
        {children}
      </Col>
    </Row>
  );
};

export default LayoutConversation;
