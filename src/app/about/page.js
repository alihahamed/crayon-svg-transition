"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // smooth scribbing
          start: "top top",
          end: "+=300%", // scroll length (3 panels)
        },
      });

      // Slide Panel 1 (Blue) to the left, revealing Panel 2
      tl.to(".panel-1", { xPercent: -100, ease: "power1.inOut" }, "reveal2")
        .from(".panel-2 .bento-top", { x: 150, opacity: 0, ease: "power1.out" }, "reveal2")
        .from(".panel-2 .bento-bottom-1", { x: 150, opacity: 0, ease: "power1.out" }, "reveal2+=0.05")
        .from(".panel-2 .bento-bottom-2", { x: 150, opacity: 0, ease: "power1.out" }, "reveal2+=0.10")
        .from(".panel-2 .bento-bottom-3", { x: 150, opacity: 0, ease: "power1.out" }, "reveal2+=0.15");
        
      // Slide Panel 2 (Green) to the right, revealing Panel 3
      tl.to(".panel-2", { xPercent: 100, ease: "power1.inOut" }, "reveal3")
        .from(".panel-3 .panel-headline", { x: -150, opacity: 0, ease: "power1.out" }, "reveal3")
        .from(".panel-3 .tech-stack-grid span", { x: -150, opacity: 0, stagger: 0.05, ease: "power1.out" }, "reveal3");
        
      // Slide Panel 3 (Pink) upwards, revealing Panel 4
      tl.to(".panel-3", { yPercent: -100, ease: "power1.inOut" }, "reveal4")
        .from(".panel-4 .bento-col-1", { x: -100, opacity: 0, ease: "power1.out" }, "reveal4")
        .from(".panel-4 .bento-col-2", { x: 100, opacity: 0, ease: "power1.out" }, "reveal4+=0.1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="about-wrapper">
      <div className="reveal-container" ref={containerRef}>
        {/* PANEL 1: Blue */}
        <section
          className="reveal-panel panel-1"
          style={{ background: "var(--transition-stroke-3)", color: "#fff" }}
        >
          <div className="panel-content">
            <p className="panel-sub" style={{ marginBottom: "1rem" }}>
              ABOUT US
            </p>
            <h2 className="panel-headline">ARCHITECTS OF LIQUID EXPERIENCE.</h2>
          </div>
        </section>

        {/* PANEL 2: Green - Brutalist Bento Box */}
        <section
          className="reveal-panel panel-2"
          style={{ background: "var(--transition-stroke-2)", color: "#000", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <div className="w-full flex-1 max-w-[1500px] mx-auto flex flex-col justify-center max-h-full overflow-hidden pt-[10vh]">
            {/* Top Headline - Not inside the border */}
            <div className="bento-top w-full overflow-hidden pb-4">
              <h2 className="panel-headline mb-0! leading-none text-left" style={{ fontSize: "clamp(5rem, 15vw, 15rem)" }}>THE APPROACH.</h2>
            </div>
            
            {/* Bottom Half - The Brutalist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-4 border-black min-h-[35vh]">
              <div className="border-b-4 md:border-b-0 md:border-r-4 border-black p-8 md:p-12 flex flex-col justify-center bento-bottom-1 bg-(--transition-stroke-2)">
                <p className="font-dm-sans text-xl md:text-3xl font-bold uppercase tracking-tight leading-tight">Every interaction is engineered with intent. Precision over guesswork.</p>
              </div>
              <div className="border-b-4 md:border-b-0 md:border-r-4 border-black p-8 md:p-12 flex flex-col justify-center bento-bottom-2 bg-(--transition-stroke-2)">
                <p className="font-dm-sans text-xl md:text-3xl font-bold uppercase tracking-tight leading-tight">We blend robust backend architecture with buttery-smooth frontend motion.</p>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center bento-bottom-3 bg-(--transition-stroke-2)">
                <p className="font-dm-sans text-xl md:text-3xl font-bold uppercase tracking-tight leading-tight">Uncompromising performance matched with striking visuals. No shortcuts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 3: Pink */}
        <section
          className="reveal-panel panel-3"
          style={{ background: "var(--transition-stroke-1)", color: "#fff", padding: "2rem" }}
        >
          <div className="w-full h-full flex flex-col justify-center max-w-[1500px] mx-auto pt-[10vh]">
            <h2 className="panel-headline mb-0! leading-none" style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>OUR STACK</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-8 md:mt-16 tech-stack-grid overflow-hidden">
              {['NEXT.JS', 'GSAP', 'NODE.JS', 'SUPABASE'].map((tech) => (
                <span 
                  key={tech} 
                  className="block text-transparent [-webkit-text-stroke:2px_white] hover:text-white transition-colors duration-300 cursor-crosshair leading-[0.85]" 
                  style={{ fontSize: "clamp(4rem, 13vw, 15rem)", fontFamily: "var(--font-barlow-condensed)", fontWeight: 700 }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PANEL 4: Final Base Layer - Brutalist Impact */}
        <section
          className="reveal-panel panel-4"
          style={{ background: "var(--bg)", color: "var(--fg)", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <div className="w-full flex-1 max-w-[1500px] mx-auto flex flex-col justify-center max-h-full overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 border-4 border-black min-h-[60vh] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              
              {/* Left Massive Block */}
              <div className="col-span-1 lg:col-span-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col items-start justify-between p-8 md:p-16 bento-col-1 bg-transparent overflow-hidden">
                  <h2 className="panel-headline mb-0! leading-none text-left tracking-tighter" style={{ fontSize: "clamp(4.5rem, 9.5vw, 15rem)" }}>
                    BEYOND<br/>THE CODE.
                  </h2>
                  <p className="font-dm-sans text-2xl md:text-4xl font-bold uppercase tracking-tight leading-tight max-w-[800px] mt-8">
                    Products that are as powerful under the hood as they are beautiful on screen.
                  </p>
              </div>
              
              {/* Right CTA Block */}
              <div className="col-span-1 lg:col-span-4 flex flex-col bento-col-2">
                <button className="w-full h-full p-8 md:p-12 bg-black text-white hover:bg-[#cdff00] hover:text-black transition-colors duration-300 flex flex-col items-center justify-center group cursor-crosshair">
                  <span className="font-barlow-condensed text-5xl md:text-7xl font-bold uppercase mb-12 tracking-tight text-center">
                    LET'S<br/>BUILD
                  </span>
                  <div className="bg-white group-hover:bg-black rounded-full p-6 md:p-8 transition-colors duration-300 transform group-hover:scale-110">
                    <svg 
                      className="w-12 h-12 md:w-20 md:h-20 text-black group-hover:text-[#cdff00] transform group-hover:rotate-45 transition-transform duration-300" 
                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
