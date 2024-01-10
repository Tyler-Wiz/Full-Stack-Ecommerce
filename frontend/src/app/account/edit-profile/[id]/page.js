import AccountLayout from "@/components/client/account/AccountLayout";
import EditProfile from "@/components/client/account/EditProfile";
import ClientLayout from "@/components/client/shared/ClientLayout";
import LoadingSpinner from "@/utils/LoadingSpinner";

const page = async ({ params }) => {
  const { id } = params;
  return (
    <ClientLayout>
      <AccountLayout>
        <EditProfile id={id} />
      </AccountLayout>
    </ClientLayout>
  );
};

export default page;
