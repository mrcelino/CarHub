'use client';
import React from "react";
import { PanelRightOpen, PanelRightClose } from "lucide-react";

export function Button({
  isSidebarVisible,
  toggleSidebar,
}: {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <button
      onClick={toggleSidebar}
      className="rounded-full hover:scale-105 p-2"
    >
      {isSidebarVisible ? (
        <PanelRightOpen className="size-5" />
      ) : (
        <PanelRightClose className="size-5" />
      )}
    </button>
  );
}
