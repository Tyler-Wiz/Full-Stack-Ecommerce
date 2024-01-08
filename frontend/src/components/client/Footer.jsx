import { FooterData } from "@/services/data/footer";
import Image from "next/image";
import { FaPhone, FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="montserrat py-10 mt-10 border-t-[1px]">
      <div className="container">
        <div className="w-1/5 flex flex-col gap-2">
          <Image
            src="/img/client/logo.png"
            width={100}
            height={50}
            className="mb-6"
          />
          <div className="flex-item gap-2">
            <FaLocationDot />
            <p>123 Main Street Chicago, IL 60601 United States</p>
          </div>
          <div className="flex-item gap-2">
            <FaPhone />
            <p>+1 (312) 555-1234</p>
          </div>
          <div className="flex-item gap-2">
            <MdEmail />
            <p>hello@sportzystore.com</p>
          </div>
        </div>
        <div className="flex-item justify-between w-2/5">
          {FooterData.map((item, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{item.header}</h3>
              {item.subMenu.map((menu, index) => (
                <p key={index} className="mb-2">
                  {menu.name}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="w-1/5">
          <h3 className="font-bold text-lg">NewsLetter</h3>
          <form action="" className="flex-item my-6">
            <input placeholder="Enter your email address.." />
            <button className=" bg-red-700 py-3 px-3 border border-gray-300">
              <FaArrowRightLong color="white" />
            </button>
          </form>
          <div>
            <Image
              src="/img/client/payments.png"
              width={300}
              height={50}
              className="mt-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
