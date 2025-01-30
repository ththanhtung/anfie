"use client";
import { useAlley } from "@/hooks";
import ModuleUsers from "@/modules/module-user";
import { _common } from "@/utils";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const UserListPage = () => {
  return (
    <>
      <ModuleUsers />
    </>
  );
};

export default UserListPage;
