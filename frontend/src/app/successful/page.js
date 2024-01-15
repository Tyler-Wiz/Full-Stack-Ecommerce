import ClientLayout from "@/components/client/shared/ClientLayout";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <ClientLayout>
      <div className="lg:container py-10 lg:px-0 px-4">
        <div className="mx-auto">
          <Image src="/img/client/order.png" width={400} height={400} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default page;
