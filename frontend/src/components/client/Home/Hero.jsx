import React from "react";
import Button from "../shared/Button";
import SecureShipping from "../shared/SecureShipping";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Hero = () => {
  return (
    <section className="montserrat">
      <div className={styles.hero}>
        <div>
          <h1>DISCOVER YOUR SPORTY EDGE</h1>
          <h4 className="montserrat">
            Get the best sports apparel with the best offer that you can afford.
            Available for worldwide shipping and free delivery order.
          </h4>
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
