import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RText from "./RText";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Placeholder content arrays for easy customization
const CONTENT = {
  title: "Field",
  tille2: "Ledger",
  subtitle:
    "Bringing Transparency to your plate with Ethereum, Polygon and Solidity.",
  textLines: ["We Make Sure that the Food you eat is "],
  ctaText: "", //Bottom Button Text
  icons: [
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/ethereum.png",
      alt: "Feature 1",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png",
      alt: "Feature 2",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/python.png",
      alt: "Feature 3",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/solidity.png",
      alt: "Feature 4",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/solana.png",
      alt: "Feature 5",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png",
      alt: "Feature 5",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/hardhat.png",
      alt: "Feature 5",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tensorflow.png",
      alt: "Feature 5",
    },
    {
      src: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/metamask.png",
      alt: "Feature 5",
    },
  ],
};

const ScrollAnimationSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const iconsRef = useRef(null);
  const textLinesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const icons = iconsRef.current;
    const textLines = textLinesRef.current;
    const cta = ctaRef.current;

    if (!section || !title || !subtitle || !icons || !textLines || !cta) return;

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=300%",
        scrub: 1,
      },
    });

    // Initial state - hide everything except title and subtitle
    gsap.set([icons.children, textLines.children, cta], {
      opacity: 0,
      y: 100,
    });

    // Animate title and subtitle entrance
    tl.fromTo(
      [title, subtitle],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );

    // Animate icons rising up from bottom
    tl.to(
      icons.children,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
      },
      "+=0.5"
    );

    // Spread icons horizontally to their final positions
    tl.to(
      icons.children,
      {
        x: (index) => {
          const positions = [-600, -450, -300, -150, 0, 150, 300, 450, 600];
          return positions[index] || 0;
        },
        duration: 1.5,
        ease: "power2.out",
      },
      "+=0.3"
    );

    // Animate text lines fading in one by one
    tl.to(
      textLines.children,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
      },
      "+=0.5"
    );

    // Final CTA animation
    tl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        scale: 1.05,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "+=0.3"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#effaf6]/60 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />

      {/* Main content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        {/* Title and Subtitle */}
        <div className="mb-16">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-mono font-bold text-white-200 text-shadow-lg/20 mb-6 hover:scale-110 hover:tracking-widest cursor-pointer ">
            {CONTENT.title}
            <h2 className="inline text-green-500">Ledger</h2>
          </h1>
          <p
            ref={subtitleRef}
            className="text-3xl text-muted-foreground font-Nunito font-light tracking-wide ">
            {CONTENT.subtitle}
          </p>
        </div>

        {/* Icons Row */}
        <div
          ref={iconsRef}
          className="flex justify-center items-center mb-16 relative"
          style={{ height: "120px" }}>
          {CONTENT.icons.map((icon, index) => (
            <div key={index} className="absolute w-20 h-20 md:w-24 md:h-24">
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-full h-full object-contain filter drop-shadow-glow transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Text Lines */}
        <div ref={textLinesRef} className="max-w-4xl mx-auto mb-16 space-y-4">
          {CONTENT.textLines.map((line, index) => (
            <p
              key={index}
              className="font-Nunito font-light text-5xl text-foreground/80 leading-relaxed">
              {line}
              <h1>
                <RText
                  texts={[
                    "Unadultered.",
                    "Fresh.",
                    "Safe",
                    "Wholesome.",
                    "Sustainable.",
                    "Traceable.",
                    "Nutritious.",
                    "Hygienic.",
                    "Uncompromised.",
                    "Natural.",
                    "Authentic.",
                    "Ethically Produced.",
                    "Priced Correctly.",
                  ]}
                  mainClassName="font-Nunito font-extrabold text-green-400 rounded-lg px-2 py-2 flex justify-center items-center text-shadow-lg/30 text-8xl"
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
            </p>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef}>
          <button className="group relative px-12 py-4 text-2xl md:text-3xl font-bold bg-gradient-primary text-primary-foreground rounded-full shadow-glow transition-all duration-500 hover:shadow-[0_0_60px_hsl(260_100%_80%_/_0.5)] hover:scale-105">
            <span className="relative z-10">{CONTENT.ctaText}</span>
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full filter blur-3xl" />
      </div>
    </div>
  );
};

export default ScrollAnimationSection;
