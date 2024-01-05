import React from "react";
import Button from "../shared/Button";
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

const Hero = () => {
  return (
    <section>
      <div className="jost sm:bg-hero bg-cover h-[500px] px-44">
        <div className="sm:w-[50%] sm:pt-16">
          <h1 className="text-6xl text-black font-bold py-6">
            DISCOVER YOUR SPORTY EDGE
          </h1>
          <p className="montserrat pb-6">
            Get the best sports apparel with the best offer that you can afford.
            Available for worldwide shipping and free delivery order.
          </p>
          <Button
            name="SHOP NOW"
            color="text-white"
            backgroundColor="bg-primary"
            border="border-2"
          />
        </div>
      </div>
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
    </section>
  );
};

export default Hero;
