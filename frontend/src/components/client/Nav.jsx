import Link from "next/link";
import React from "react";

const NavData = [
  { name: "Home", link: "/" },
  { name: "products", link: "/products" },
  { name: "contact", link: "/contact" },
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
