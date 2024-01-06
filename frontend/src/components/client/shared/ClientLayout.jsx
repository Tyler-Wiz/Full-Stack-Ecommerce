"use client";

import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import RenderWishList from "./RenderWishList";

const ClientLayout = ({ children }) => {
  const [openWishList, setOpenWishList] = useState(false);

  return (
    <div>
      <RenderWishList
        openWishList={openWishList}
        setOpenWishList={setOpenWishList}
      />
      <div className={openWishList ? "opacity-50 " : ""}>
        <Header setOpenWishList={setOpenWishList} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default ClientLayout;
