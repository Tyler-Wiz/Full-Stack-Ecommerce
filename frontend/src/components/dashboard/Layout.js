"use client";

import React, { useState } from "react";
import Sidebar from "./shared/Sidebar";
import Footer from "./shared/Footer";
import Nav from "./shared/Nav";

const AdminLayout = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="flex h-screen bg-background w-full">
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
      <div className={expanded ? "main" : "main w-[96%]"}>
        <Nav />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
