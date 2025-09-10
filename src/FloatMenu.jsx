import StaggeredMenu from "./StaggeredMenu";
import logo from "./logo.png";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Login", ariaLabel: "Learn about us", link: "/login" },
  { label: "Solution", ariaLabel: "View our services", link: "/solution" },
  { label: "Flow", ariaLabel: "Get in touch", link: "/flow" },
];

const socialItems = [
  { label: "Kiet", link: "https://kiet.edu" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

import React from "react";

function FloatMenu() {
  return (
    <div className="overflow-hidden" style={{ height: "100vh" }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#98FB98", "#228B22"]}
        logoUrl={logo}
        accentColor="#ff6b6b"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />
    </div>
  );
}

export default FloatMenu;
