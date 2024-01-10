import AccountLayout from "@/components/client/account/AccountLayout";
import PersonalDetails from "@/components/client/account/PersonalDetails";
import ClientLayout from "@/components/client/shared/ClientLayout";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const page = () => {
  const token = cookies().get("session");
  const user = jwtDecode(token.value);
  return (
    <ClientLayout>
      <AccountLayout>
        <PersonalDetails user={user} />
      </AccountLayout>
    </ClientLayout>
  );
};

export default page;
