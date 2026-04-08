"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TICKER_ITEMS = [
  "BRANDING", "WEB DESIGN", "MOTION", "UI/UX", "INTERACTION",
  "DEVELOPMENT", "STRATEGY", "IDENTITY",
  "BRANDING", "WEB DESIGN", "MOTION", "UI/UX", "INTERACTION",
  "DEVELOPMENT", "STRATEGY", "IDENTITY",
];

export default function Home() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const tickerRef = useRef(null);
  const descWrapRef = useRef(null);
  const descRef = useRef(null);
  const sideInfoRef = useRef(null);

  // Split-text entrance animation
  useEffect(() => {
    if (!headlineRef.current) return;

    const chars = headlineRef.current.querySelectorAll(".char");

    gsap.set(chars, { y: 120, opacity: 0 });
    gsap.set(ctaRef.current, { y: 30, opacity: 0 });
    if (sideInfoRef.current) gsap.set(sideInfoRef.current, { x: 40, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.04,
      ease: "back.out(1.7)",
    })
    .to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3")
    .to(sideInfoRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.4");
  }, []);

  // Description hover reveal on headline
  useEffect(() => {
    const headline = headlineRef.current;
    const descWrap = descWrapRef.current;
    const desc = descRef.current;
    if (!headline || !descWrap || !desc) return;

    gsap.set(descWrap, { height: 0, opacity: 0 });
    gsap.set(desc, { y: 8, opacity: 0 });

    let activeTl;

    const handleEnter = () => {
      if (activeTl) activeTl.kill();
      activeTl = gsap.timeline();
      activeTl
        .to(descWrap, {
          height: "auto",
          opacity: 1,
          duration: 0.25,
          ease: "power3.out",
        })
        .to(desc, {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        }, "<");
    };

    const handleLeave = () => {
      if (activeTl) activeTl.kill();
      activeTl = gsap.timeline();
      activeTl
        .to(desc, {
          y: 8,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(descWrap, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power3.out",
        }, "<");
    };

    headline.addEventListener("mouseenter", handleEnter);
    headline.addEventListener("mouseleave", handleLeave);

    return () => {
      headline.removeEventListener("mouseenter", handleEnter);
      headline.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Infinite ticker animation
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    gsap.to(ticker, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <main
      ref={heroRef}
      style={{
        height: "100dvh",
        width: "100%",
        background: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Inline responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-side-info {
          position: absolute;
          right: 3rem;
          bottom: 11rem; /* Placed above the CTA */
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.5rem; /* Increased spacing */
        }
        .hero-content-layer {
          padding: 0 3rem;
          padding-top: 100px;
        }
        .hero-cta-wrap {
          bottom: 5rem;
          right: 3rem;
        }
        .hero-headline-text {
          font-size: clamp(3.5rem, 11vw, 14rem);
        }
        .hero-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }
        .hero-cta-wrap {
          position: absolute;
          z-index: 4;
          transition: transform 0.15s, box-shadow 0.15s, background 0.2s, color 0.2s;
        }
        .hero-cta-wrap:hover {
          background: #000 !important;
          color: #AAFF00 !important;
          border-color: #AAFF00 !important;
          transform: translate(-3px, -3px);
          box-shadow: 11px 11px 0px #AAFF00 !important;
        }

        @media (max-width: 1024px) {
          .hero-side-info {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            bottom: auto !important;
            transform: none !important;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
            margin-top: 1.5rem;
            width: 100%;
            max-width: 320px;
          }
          .hero-content-layer {
            padding: 0 1.5rem;
            padding-top: 80px;
          }
          .hero-cta-wrap {
            position: relative;
            bottom: auto;
            right: auto;
            margin-top: 1rem;
            width: fit-content;
          }
          .hero-headline-text {
            font-size: clamp(3rem, 14vw, 8rem);
          }
        }

        @media (max-width: 640px) {
          .hero-side-info {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            bottom: auto !important;
            transform: none !important;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap; /* Guarantee absolute single line */
            justify-content: space-between;
            gap: 0.5rem;
            max-width: 100%;
            margin-top: 2rem;
            padding: 0 1.25rem;
          }
          .stat-box {
            border: none !important;
            background: transparent !important;
            backdrop-filter: none !important;
            padding: 0 !important;
            text-align: left !important;
            flex: 1; /* Stretch to fit strictly in quarters */
          }
          .stat-value {
            font-size: clamp(1.2rem, 5.5vw, 2rem) !important; 
          }
          .stat-label {
            font-size: clamp(0.5rem, 2.2vw, 0.75rem) !important;
            letter-spacing: 0em !important;
          }
          .hero-content-layer {
            padding: 0 1.25rem;
            padding-top: 13dvh;
            justify-content: flex-start;
            flex: 0 0 auto !important;
          }
          .hero-headline-text {
            font-size: clamp(3rem, 21vw, 7rem); 
            line-height: 0.85;
          }
          .hero-cta-wrap {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 1.5rem;
            margin-left: 1.25rem;
            width: fit-content !important;
            align-self: flex-start !important;
          }
        }
      `}} />

      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <source src="/kling_20260404_VIDEO_The_camera_5954_0.mp4" type="video/mp4" />
      </video>

      {/* Stronger left-heavy gradient overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.25) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Film grain texture overlay */}
      <div
        className="hero-grain"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          opacity: 0.6,
          mixBlendMode: "overlay",
        }}
      />


      {/* Content layer */}
      <div
        className="hero-content-layer"
        style={{
          position: "relative",
          zIndex: 3,
          flex: "1 0 auto",
          minHeight: "min-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "3rem",
        }}
      >
        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="hero-headline-text"
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 900,
            lineHeight: 0.85,
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            color: "#fff",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            cursor: "default",
          }}
        >
          {/* Line 1 */}
          <span style={{ display: "block", overflow: "hidden" }}>
            {"CRAFTING".split("").map((char, i) => (
              <span
                key={`l1-${i}`}
                className="char"
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </span>

          {/* Hover description reveal — tucked between lines */}
          <span
            ref={descWrapRef}
            style={{
              display: "block",
              overflow: "hidden",
            }}
          >
            <span
              ref={descRef}
              style={{
                display: "block",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.7rem, 1.1vw, 1rem)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.5,
                padding: "0.4rem 0",
                textShadow: "none",
              }}
            >
              A creative studio building high-performance digital experiences with intent, precision, and craft.
            </span>
          </span>

          {/* Line 2 */}
          <span style={{ display: "block", overflow: "hidden" }}>
            {"LIQUID".split("").map((char, i) => (
              <span
                key={`l2-${i}`}
                className="char"
                style={{
                  display: "inline-block",
                  color: "#AAFF00",
                  textShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </span>

          {/* Line 3 */}
          <span style={{ display: "block", overflow: "hidden" }}>
            {"DIGITAL.".split("").map((char, i) => (
              <span
                key={`l3-${i}`}
                className="char"
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

      </div>

      {/* Right side info panel — abs on desktop, flows in content on tablet/mobile */}
      <div
        ref={sideInfoRef}
        className="hero-side-info"
        style={{}}
      >
        {[
          { value: "99", label: "LIGHTHOUSE" },
          { value: "∞", label: "ITERATIONS" },
          { value: "<3s", label: "PAGE LOAD" },
          { value: "12+", label: "PROJECTS" },
        ].map(({ value, label }, i) => (
          <div key={i} className="stat-box" style={{
            border: "3px solid rgba(255,255,255,0.5)",
            padding: "0.75rem 1.1rem",
            textAlign: "center",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
          }}>
            <div className="stat-value" style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(1.8rem, 3vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}>
              {value}
            </div>
            <div className="stat-label" style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.45)",
              marginTop: "0.2rem",
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA — bottom right on desktop, flows naturally on mobile */}
      <button
        ref={ctaRef}
        className="hero-cta-wrap"
        onClick={() => window.location.href = "/contact"}
        style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "clamp(1rem, 1.6vw, 1.5rem)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#000",
          background: "#AAFF00",
          border: "4px solid #000",
          borderRadius: 0,
          padding: "0.9rem 2.2rem",
          cursor: "pointer",
          boxShadow: "8px 8px 0px #000",
          whiteSpace: "nowrap",
        }}
      >
        LET&apos;S BUILD →
      </button>

      {/* Bottom Ticker */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          borderTop: "3px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          overflow: "hidden",
          padding: "0.75rem 0",
          flexShrink: 0,
          marginTop: "auto", /* Push firmly to bottom of viewport */
        }}
      >
        <div
          ref={tickerRef}
          style={{
            display: "flex",
            gap: 0,
            width: "max-content",
            willChange: "transform",
          }}
        >
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "clamp(0.85rem, 1.6vw, 1.3rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: i % 2 === 0 ? "#AAFF00" : "#fff",
                padding: "0 2rem",
                whiteSpace: "nowrap",
              }}
            >
              {item}
              <span style={{ marginLeft: "2rem", opacity: 0.3 }}>/</span>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
