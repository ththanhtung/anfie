"use client";
import { Col, Row } from "antd";
import React, {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
} from "react";
type TProps = PropsWithChildren;
const LayoutNote = ({ children }: TProps) => {
  return <Row className="w-full bg-slate-100">{children}</Row>;
};

export default LayoutNote;
