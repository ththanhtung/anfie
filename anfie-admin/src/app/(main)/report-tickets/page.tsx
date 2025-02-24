"use client";

import { ModuleReportTickets } from "@/modules";
import { _common } from "@/utils";
import React, { Suspense } from "react";

const ReportTicketListPage = () => {
  return (
    <>
      <Suspense>
        <ModuleReportTickets />
      </Suspense>
    </>
  );
};

export default ReportTicketListPage;
