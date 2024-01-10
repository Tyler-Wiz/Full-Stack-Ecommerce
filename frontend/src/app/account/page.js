import AccountLayout from "@/components/client/account/AccountLayout";
import RenderAccountPage from "@/components/client/account/RenderAccountPage";
import ClientLayout from "@/components/client/shared/ClientLayout";
import React from "react";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const page = () => {
  const token = cookies().get("session");
  const user = jwtDecode(token.value);
  return (
    <ClientLayout>
      <AccountLayout>
        <RenderAccountPage user={user} />
      </AccountLayout>
    </ClientLayout>
  );
};

export default page;
