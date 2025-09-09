import { nav } from "motion/react-client";
import PillNav from "./PillNav";
import logo from "./vite.svg";

export default function Navbar() {
  return (
    <div className="h-screen fixed left-125 ">
      <nav>
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
    </div>
  );
}
