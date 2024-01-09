import Button from "@/components/client/shared/Button";
import ClientLayout from "@/components/client/shared/ClientLayout";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <ClientLayout>
      <div className="flex justify-center items-center my-24 ">
        <div className="relative w-96 h-96">
          <Image src="/img/client/404.png" fill alt="product not found" />
        </div>
        <div className="flex justify-center flex-col gap-3">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="jost text-lg">Oh,No! This page does not Exist</p>
          <Link href="/">
            <Button
              name="Got to Home Page"
              backgroundColor="bg-black"
              color="text-white"
            />
          </Link>
        </div>
      </div>
    </ClientLayout>
  );
}
