"use client";

import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import RenderWishList from "./RenderWishList";
import RenderCartList from "./RenderCartList";
import Breadcrumb from "@/utils/useBreadCrumb";

const ClientLayout = ({ children }) => {
  const [openWishList, setOpenWishList] = useState(false);
  const [openCartList, setOpenCartList] = useState(false);

  return (
    <div>
      <RenderWishList
        openWishList={openWishList}
        setOpenWishList={setOpenWishList}
      />
      <RenderCartList
        openCartList={openCartList}
        setOpenCartList={setOpenCartList}
      />
      <div className={openWishList || openCartList ? "opacity-50 " : ""}>
        <Header
          setOpenWishList={setOpenWishList}
          setOpenCartList={setOpenCartList}
        />
        <div className="bg-gray-50">
          <div className="lg:container px-6 lg:px-0">
            <Breadcrumb />
          </div>
        </div>

        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default ClientLayout;
