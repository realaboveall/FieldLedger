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
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[1000001]">
        <FloatMenu />
      </div>
      <div className="w-full h-full">
        {/* Background Video (fixed) */}
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-white text-center bg-black/50 z-1000000">
          <video
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
            autoPlay
            muted
            loop
            playsInline>
            <source src="/Hero2.webm" type="video/mp4" />
          </video>
          <div className="">
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
            <p className="font-Nunito text-8xl font-extrabold text-green-400">
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
          </div>
        </section>
        <section className="bg-black/90">
          <ScrollAnimationSection />
        </section>
        {/* <section className="h-screen bg-white text-4xl font-semibold shadow-2xl relative overflow-hidden ">
        <div className="w-fit h-fit rounded-2xl border-4 border-black -rotate-34 shadow-lg object-fit absolute right-20 top-80 scale-125">
          <img className="h-48 w-96 object-cover" src="./img/1.jpg" alt="1" />
        </div>
        <div className="w-fit h-fit rounded-2xl border-4 border-black rotate-34 shadow-lg object-fit absolute left-20 top-80 scale-125">
          <img className="h-48 w-96 object-cover" src="./img/2.jpg" alt="1" />
        </div>
        <div className="w-fit h-fit rounded-2xl border-4 border-black rotate-34 shadow-lg object-fit absolute right-80 top-80 scale-125">
          <img className="h-48 w-96 object-cover" src="./img/3.jpg" alt="1" />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="font-Sirivennela font-extrabold text-9xl z-1001">
            Do You know if your Food is
            <RText
              texts={[
                "Adultered?",
                "Fresh?",
                "Priced Correctly?",
                "Authentic?",
                "Pasturized?",
              ]}
              mainClassName="font-Nunito text-green-400 rounded-lg px-2 py-2 flex justify-center items-center text-shadow-lg/30"
              staggerFrom={"first"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.05}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h1>
        </div>
      </section>
      <section className="h-screen flex items-center justify-center bg-gray-200 text-4xl font-semibold relative">
        <FlowComponent />
      </section> */}
      </div>
    </>
  );
}
