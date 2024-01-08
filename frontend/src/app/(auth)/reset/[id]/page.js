import PasswordReset from "@/components/client/auth/PasswordReset";
import React from "react";
import ClientLayout from "@/components/client/shared/ClientLayout";

const page = ({ params }) => {
  return (
    <ClientLayout>
      <PasswordReset id={params.id} />
    </ClientLayout>
  );
};

export default page;
