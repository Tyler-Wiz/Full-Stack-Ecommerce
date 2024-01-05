import Link from "next/link";
import React from "react";

const NavData = [
  { name: "Home", link: "/" },
  { name: "shop", link: "/shop" },
  { name: "products", link: "/products" },
  { name: "blog", link: "/blog" },
];

const Nav = () => {
  return (
    <nav className="header-nav">
      {NavData.map((item, index) => (
        <Link key={index} href={item.link}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
