"use client";
import { useAlley } from "@/hooks";
import { _common, deleteCookieValue } from "@/utils";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    localStorage.clear();
    deleteCookieValue({ name: "jwt" });
    redirect("/login");
  }, []);

  return null;
};

export default LogoutPage;
