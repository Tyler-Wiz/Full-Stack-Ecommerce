import React from "react";
import Button from "../shared/Button";
import SecureShipping from "../shared/SecureShipping";

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
      <SecureShipping />
    </section>
  );
};

export default Hero;
