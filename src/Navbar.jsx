import { nav } from "motion/react-client";
import PillNav from "./PillNav";
import logo from "./vite.svg";

export default function Navbar() {
  return (
    <div className="h-screen">
      <nav>
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
      </nav>
    </div>
  );
}
