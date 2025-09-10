import { nav } from "motion/react-client";
import PillNav from "./PillNav";
import logo from "./logo.png";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [tolerance] = useState(10); // Minimum scroll difference to trigger

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY - lastScrollY > tolerance) {
      // Scrolling down → hide navbar
      setShow(false);
    } else if (lastScrollY - currentScrollY > tolerance) {
      // Scrolling up → show navbar
      setShow(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-130 w-full z-50 bg-white shadow-md transition-transform duration-300 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Login", href: "/login" },
          { label: "Contact", href: "/contact" },
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#00FA9A"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
    </nav>
  );
}
