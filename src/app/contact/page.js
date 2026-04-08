"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Contact() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const titleWrapRef = useRef(null);
  const pRef = useRef(null);
  const fieldsRef = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Title Character Animation
      if (titleWrapRef.current) {
        const chars = titleWrapRef.current.querySelectorAll(".char");
        gsap.from(chars, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.05,
        });
      }

      // Description fade in
      gsap.from(pRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });

      // Animate form fields - High-impact, prominent falling gravity
      gsap.from(fieldsRef.current, {
        y: -600,
        rotation: () => Math.random() * 30 - 15, // Prominent chaotic rotation
        opacity: 0,
        duration: 1.4,
        ease: "back.out(1.5)", // Hits harder and snaps back firmly 
        stagger: 0.15,
        delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    gsap.to([titleWrapRef.current, pRef.current, ...fieldsRef.current], {
      y: 300,
      opacity: 0,
      rotation: () => Math.random() * 20 - 10,
      duration: 0.8,
      ease: "power3.in",
      stagger: 0.05,
      onComplete: () => setSubmitted(true),
    });
  };

  return (
    <main 
      ref={containerRef}
      className="h-[100svh] w-full bg-[#F4F4F4] text-black pt-[90px] md:pt-[110px] pb-6 px-4 md:px-8 lg:px-12 xl:px-16 lg:overflow-hidden flex flex-col"
    >
      <style dangerouslySetInnerHTML={{__html: `
        .brutal-box-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #000;
        }
        .brutal-box-input::placeholder {
          color: rgba(0, 0, 0, 0.15);
        }
        /* Barlow Condensed has an extremely narrow aspect ratio. Font size must be massive to fill width. */
        .title-clamp {
          font-size: min(22vw, 22vh);
        }
        @media (min-width: 1024px) {
          .title-clamp {
            font-size: min(15vw, 29vh);
          }
        }
      `}} />

      {submitted ? (
        <div className="w-full flex-grow flex items-center justify-center text-center z-10">
          <h1 
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
            className="text-[12vw] leading-[0.85] font-bold uppercase tracking-tighter"
          >
            INQUIRY RECEIVED.
            <br />
            <span className="text-[#AAFF00] drop-shadow-[0_4px_0_rgba(0,0,0,1)]">WE'LL TALK SOON.</span>
          </h1>
        </div>
      ) : (
        <div className="flex-grow w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24 relative z-10 h-full">
          
          {/* Left Column: Heading */}
          <div ref={leftColRef} className="w-full lg:w-[50%] flex flex-col justify-center h-full pl-0 lg:pl-8">
            <h1 
              ref={titleWrapRef}
              style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              className="title-clamp leading-[0.8] font-bold uppercase tracking-tighter"
            >
              <span className="block whitespace-nowrap overflow-visible">
                {"LET'S".split('').map((char, i) => (
                  <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>{char}</span>
                ))}
              </span>
              <span className="block whitespace-nowrap overflow-visible">
                {"CREATE".split('').map((char, i) => (
                  <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>{char}</span>
                ))}
              </span>
              <span className="block whitespace-nowrap text-[#AAFF00] drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
                {"SOMETHING.".split('').map((char, i) => (
                  <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>{char}</span>
                ))}
              </span>
            </h1>
            <p ref={pRef} className="mt-8 md:mt-12 lg:mt-16 text-sm md:text-base lg:text-xl font-bold text-gray-700 max-w-lg uppercase tracking-wide leading-snug" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              Fill out the form to start a conversation about your next project. We build digital experiences with intent.
            </p>
          </div>

          {/* Right Column: Form */}
          <form onSubmit={handleSubmit} className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-center gap-3 lg:gap-4 h-full pr-4 md:pr-12 lg:pr-16 pb-2 lg:pb-0">
            
            {/* Field Box 1 */}
            <div 
              ref={(el) => (fieldsRef.current[0] = el)}
              className="border-[3px] lg:border-4 border-black bg-white p-3 lg:p-4 xl:p-5 transition-colors focus-within:bg-[#fafff0] shadow-[5px_5px_0_0_rgba(0,0,0,1)] lg:shadow-[8px_8px_0_0_rgba(0,0,0,1)] duration-200"
            >
              <label className="block text-xs lg:text-sm xl:text-base font-bold text-gray-400 mb-1 tracking-widest uppercase" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                01 / WHAT'S YOUR NAME?
              </label>
              <input 
                type="text" 
                required
                placeholder="JOHN DOE" 
                className="brutal-box-input text-3xl lg:text-4xl xl:text-5xl uppercase font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              />
            </div>

            {/* Field Box 2 */}
            <div 
              ref={(el) => (fieldsRef.current[1] = el)}
              className="border-[3px] lg:border-4 border-black bg-white p-3 lg:p-4 xl:p-5 transition-colors focus-within:bg-[#fafff0] shadow-[5px_5px_0_0_rgba(0,0,0,1)] lg:shadow-[8px_8px_0_0_rgba(0,0,0,1)] duration-200"
            >
              <label className="block text-xs lg:text-sm xl:text-base font-bold text-gray-400 mb-1 tracking-widest uppercase" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                02 / WHERE CAN WE REACH YOU?
              </label>
              <input 
                type="email" 
                required
                placeholder="HELLO@EXAMPLE.COM" 
                className="brutal-box-input text-3xl lg:text-4xl xl:text-5xl uppercase font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              />
            </div>

            {/* Field Box 3 */}
            <div 
              ref={(el) => (fieldsRef.current[2] = el)}
              className="border-[3px] lg:border-4 border-black bg-white p-3 lg:p-4 xl:p-5 transition-colors focus-within:bg-[#fafff0] shadow-[5px_5px_0_0_rgba(0,0,0,1)] lg:shadow-[8px_8px_0_0_rgba(0,0,0,1)] duration-200"
            >
              <label className="block text-xs lg:text-sm xl:text-base font-bold text-gray-400 mb-1 tracking-widest uppercase" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                03 / WHAT ARE WE BUILDING?
              </label>
              <textarea 
                required
                rows={2}
                placeholder="TELL US ABOUT THE PROJECT..." 
                className="brutal-box-input text-3xl lg:text-4xl xl:text-5xl uppercase font-bold tracking-tight resize-none border-0 p-0 m-0 leading-none"
                style={{ fontFamily: 'var(--font-barlow-condensed)' }}
              />
            </div>

            {/* Submit Button */}
            <div 
              ref={(el) => (fieldsRef.current[3] = el)}
              className="mt-1 lg:mt-2"
            >
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-[#AAFF00] hover:text-black border-[3px] lg:border-4 border-black transition-all duration-300 py-4 lg:py-5 xl:py-6 flex items-center justify-center shadow-[5px_5px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:-translate-x-[2px]"
              >
                <span 
                  style={{ fontFamily: 'var(--font-barlow-condensed)' }}
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-widest cursor-pointer"
                >
                  {isSubmitting ? "SENDING..." : "SEND INQUIRY →"}
                </span>
              </button>
            </div>

          </form>
        </div>
      )}
    </main>
  );
}
