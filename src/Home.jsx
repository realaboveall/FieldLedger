import { nav } from "motion/react-client";
import DecryptedText from "./DecryptedText";
import FlowComponent from "./FlowComponent";
import RText from "./RText";
import StaggeredMenu from "./PillNav.jsx";
import ScrollAnimationSection from "./ScrollAnimationSection.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import FloatMenu from "./FloatMenu";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Solution", ariaLabel: "View our services", link: "/solution" },
  { label: "FlowChart", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function Home() {
  return (
    <div className="w-full h-full relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40">
        <FloatMenu />
      </nav>

      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        muted
        loop
        playsInline>
        <source src="/Hero2.webm" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-white text-center bg-black/50">
        <h1 className="font-Merriweather text-6xl font-light text-green-200">
          <DecryptedText
            text="Transparency and Trust"
            revealDirection="start"
            speed={150}
            maxIterations={20}
            animateOn="view"
            sequential="true"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="font-Merriweather text-6xl font-light"
          />
        </h1>

        <p className="font-Nunito text-8xl font-extrabold text-green-400 mb-4">
          From Farm to{" "}
          <span className="font-Sirivennela text-9xl text-green-200">
            Fork𐂐
          </span>
        </p>

        <p className="font-light text-2xl">
          <DecryptedText
            text="With FieldLedger."
            revealDirection="start"
            speed={100}
            maxIterations={20}
            sequential="true"
            characters="BLOCKCHAIN"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="hover"
          />
        </p>
      </section>

      {/* Scroll Animation Section */}
      <section className="bg-black/90 relative z-0">
        <ScrollAnimationSection />
      </section>

      {/* Example Other Sections (commented in your code) */}
      {/* <section className="h-screen bg-white text-4xl font-semibold relative overflow-hidden">
        <FlowComponent />
      </section> */}
    </div>
  );
}
