import { LiaShippingFastSolid } from "react-icons/lia";
import { TbWorld } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";
import styles from "@/components/client/styles/Home.module.css";

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
    <div className={styles.shippingContainer}>
      {heroData.map((item, index) => (
        <div
          key={index}
          className={`px-6 capitalize jost  ${
            index !== 2 ? "lg:border-r-[1px]" : ""
          }`}>
          <div className={styles.shippingIcon}>
            {item.icon}
            <h3>{item.name}</h3>
          </div>
          <p className="montserrat">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SecureShipping;
