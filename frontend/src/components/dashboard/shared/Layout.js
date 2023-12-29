"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Nav from "./Nav";
import { DateTimeComponent } from "@/utils/DateTime";
import { MdRefresh } from "react-icons/md";

const AdminLayout = ({ children, title, currentDate }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const [refresh, setRefresh] = useState(false);

  const loading = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 4000);
  };

  return (
    <div className="flex  bg-background w-full">
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
      <div className={expanded ? "main" : "main w-[96%]"}>
        <Nav />
        <div className="h-[85%]">
          <div className=" bg-white rounded-xl h-16 px-6 flex justify-between items-center">
            <h2>{title}</h2>
            <div className="flex justify-between items-center gap-6">
              <div className="flex justify-between items-center gap-6">
                <p>Refresh</p>
                <button
                  onClick={() => loading()}
                  className={`${refresh ? "animate-spin" : ""}`}>
                  <MdRefresh size={25} />
                </button>
              </div>
              <p className="bg-slate-50 p-3 text-sm rounded-lg font-semibold">
                {currentDate}
              </p>
            </div>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
