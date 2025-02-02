"use client";

import { LayoutAuth } from "@/components";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <LayoutAuth>{children}</LayoutAuth>;
};

export default AuthLayout;
