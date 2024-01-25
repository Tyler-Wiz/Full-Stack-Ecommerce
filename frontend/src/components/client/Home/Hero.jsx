import React from "react";
import Button from "../shared/Button";
import SecureShipping from "../shared/SecureShipping";
import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className="jost px-8 py-10 bg-heroBg md:bg-hero md:bg-cover md:h-[500px] md:px-44 md:py-0">
        <div className="md:w-[50%] md:pt-16">
          <h1>DISCOVER YOUR SPORTY EDGE</h1>
          <p className="montserrat pb-6">
            Get the best sports apparel with the best offer that you can afford.
            Available for worldwide shipping and free delivery order.
          </p>
          <Link href="/products">
            <Button
              name="SHOP NOW"
              color="text-white"
              backgroundColor="bg-primary"
              border="border-2"
            />
          </Link>
        </div>
      </div>
      <SecureShipping />
    </section>
  );
};

export default Hero;
