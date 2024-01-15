import React from "react";
import { getOrderByUser } from "@/services/api/fetch/fetchAll";
import ClientLayout from "@/components/client/shared/ClientLayout";
import RenderOrderPage from "@/components/client/account/RenderOrderPage";

const page = async ({ params }) => {
  const id = params.id;
  const orderItems = await getOrderByUser(id);

  return (
    <ClientLayout>
      <RenderOrderPage orderItems={orderItems} />
    </ClientLayout>
  );
};

export default page;
