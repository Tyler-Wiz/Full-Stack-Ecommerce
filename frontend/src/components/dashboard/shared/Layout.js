"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Nav from "./Nav";
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
    <div className="flex bg-background w-full ">
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
      <div className={expanded ? "main ml-[18%]" : "main ml-[4%] w-[96%]"}>
        <Nav />
        <div className="min-h-screen">
          <div className=" bg-white rounded-xl h-12 px-6 flex justify-between items-center">
            <h2 className="text-xl">{title}</h2>
            <div className="flex justify-between items-center gap-2">
              <div className="flex justify-between items-center gap-6">
                <p>Refresh</p>
                <button
                  onClick={() => loading()}
                  className={`${refresh ? "animate-spin" : ""}`}>
                  <MdRefresh size={20} />
                </button>
              </div>
              <p className="bg-slate-50 p-3 text-xs rounded-lg font-semibold">
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
