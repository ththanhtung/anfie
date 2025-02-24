"use client";

import ModuleUsers from "@/modules/module-user";
import { _common } from "@/utils";
import { redirect } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const UserListPage = () => {
  return (
    <>
      <Suspense>
        <ModuleUsers />
      </Suspense>
    </>
  );
};

export default UserListPage;
