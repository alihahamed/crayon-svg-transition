"use client";

import { TransitionRouter } from "next-transition-router";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function TransitionProvider({ children }) {

    const svgsRef = useRef(null)
    const pathRef = useRef([]) // stores an array of the individual paths

    useEffect(() => {
        if(!svgsRef.current) return 

        pathRef.current = Array.from(svgsRef.current.querySelectorAll("path"))

        pathRef.current.forEach((path) => {
            const length = path.getTotalLength() // returns the pixel length of each svg
            path.style.strokeDasharray = length
            path.style.strokeDashoffset = length
        })
    }, [])

  return (
    <TransitionRouter auto
        leave={(next) => {
            const tl = gsap.timeline({onComplete:next})

            pathRef.current.forEach((path, index) => {
                tl.to(
                    path,
                    {   
                        strokeDashoffset:0,
                        attr:{"stroke-width":700},
                        duration:1,
                        ease:"power1.inOut"
                    },
                    index * 0.3,
                )
            })

            return () => tl.kill()
        }}
        enter={(next) => {
            const tl = gsap.timeline({ onComplete:next})

            pathRef.current.forEach((path, index) => {
                const length = path.getTotalLength()
                tl.to(
                    path,
                    {
                        strokeDashoffset:-length,
                        attr:{"stroke-width": 200},
                        duration:1,
                        ease:"power1.inOut",
                        onComplete: () => {
                            gsap.set(path, {strokeDashoffset: length})
                        },
                    }, 
                    index * 0.1,
                )
            })

            // Text stagger entrance
            const chars = document.querySelectorAll(".hero h1 .char");
            if(chars.length) {
                // start them hidden below
                gsap.set(chars, { y: 50, opacity: 0 });
                // stagger them in 0.4s after the crayons start revealing
                tl.to(
                    chars,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.03,
                        ease: "power3.out"
                    },
                    0.4
                );
            }

            return () => tl.kill()
        }}
    >
      <div className="transition-svg">
        <svg
        ref={svgsRef}
          viewBox="0 0 2453 2535"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
            stroke="var(--transition-stroke-1)"
            strokeWidth="200"
            strokeLinecap="round"
          />
          <path
            d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
            stroke="var(--transition-stroke-2)"
            strokeWidth="200"
            strokeLinecap="round"
          />
          <path
            d="M950.5 2450.2C950.5 2450.2 1580.3 2100.8 1350.7 1650.4C1121.1 1200.0 280.6 1850.3 450.2 1350.7C619.8 851.1 1750.4 1450.6 1950.8 950.2C2151.2 449.8 850.3 650.4 650.1 250.6C449.9 -149.2 1250.7 350.8 1250.7 350.8"
            stroke="var(--transition-stroke-3)"
            strokeWidth="200"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {children}
    </TransitionRouter>
  ); // the auto prop tells the app to intercept any next js link navigations in the app so we do not have to manually trigger animations by ourselves
}
