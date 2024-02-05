'use client'
import { Col, Row } from "antd";
import React, { PropsWithChildren, ReactNode, useContext, useEffect } from "react";
type TProps = PropsWithChildren & {
  renderLeft: ReactNode;
};
const LayoutConversation = ({ renderLeft, children }: TProps) => {

  return (
    <Row className="w-full bg-slate-100">
      <Col md={8} lg={8} className="h-full">
        {renderLeft}
      </Col>
      <Col md={12} lg={16}>
        {children}
      </Col>
    </Row>
  );
};

export default LayoutConversation;
