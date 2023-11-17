"use client";
import HeaderDashboard from "@/app/ui/molecules/headerDashboard";
import React from "react";

export default function Page({ params }) {
  console.log(params);

  return (
    <React.Fragment>
      <HeaderDashboard></HeaderDashboard>

      {/* Rune hier komt jouw code */}
    </React.Fragment>
  );
}
