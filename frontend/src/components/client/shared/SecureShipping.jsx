import { LiaShippingFastSolid } from "react-icons/lia";
import { TbWorld } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";

const heroData = [
  {
    name: "worldwide shipping",
    icon: <TbWorld size={30} />,
    description:
      "Doesn’t matter wherever you are,you will always get your order",
  },
  {
    name: "free delivery",
    icon: <LiaShippingFastSolid size={30} />,
    description: "Free delivery order for every purchase over £100",
  },
  {
    name: "Secure Payment",
    icon: <GrSecure size={30} />,
    description: "We guarantee 100% secure payment for every order",
  },
];

const SecureShipping = () => {
  return (
    <div className="flex flex-col gap-6 items-center lg:flex-row justify-center max-w-screen-xl mx-auto py-10">
      {heroData.map((item, index) => (
        <div
          key={index}
          className={`px-6 capitalize jost  ${
            index !== 2 ? "lg:border-r-[1px]" : ""
          }`}>
          <div className="flex-item gap-3 mb-2">
            {item.icon}
            <h1 className="font-bold text-lg">{item.name}</h1>
          </div>
          <p className="montserrat text-sm text-secondary">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SecureShipping;
