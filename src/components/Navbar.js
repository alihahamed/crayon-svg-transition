"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .site-header {
          position: fixed;
          top: 1.25rem;
          left: 0;
          right: 0;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 2rem;
          pointer-events: none;
        }
        .nav-cta {
          display: flex;
          justify-content: flex-end;
          pointer-events: auto;
        }
        .hamburger-btn {
          display: none;
          pointer-events: auto;
          background: #AAFF00;
          color: #000;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          font-family: var(--font-dm-sans);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .nav-pill {
          pointer-events: auto;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 999px;
          padding: 0.3rem;
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
          display: flex;
          align-items: center;
          gap: 0;
        }
        @media (max-width: 768px) {
          .site-header {
            display: flex;
            justify-content: space-between;
            padding: 0 1rem;
            align-items: flex-start;
          }
          .nav-cta {
            display: none !important;
          }
          .hamburger-btn {
            display: block;
          }
          .nav-pill-wrapper {
            position: absolute;
            top: 3.5rem;
            right: 1rem;
            display: flex;
            flex-direction: column;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-10px);
            transition: all 0.2s ease;
          }
          .nav-pill-wrapper.open {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }
          .nav-pill {
            flex-direction: column;
            border-radius: 12px;
            padding: 0.5rem;
            background: rgba(255,255,255,0.98);
          }
        }
      `}} />
      <header className="site-header">
        {/* Logo */}
      <Link
        href="/"
        style={{
          pointerEvents: "auto",
          textDecoration: "none",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "1rem",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.03em",
          textShadow: "0 1px 10px rgba(0,0,0,0.5)",
          justifySelf: "start",
        }}
      >
        alihahamed
      </Link>

      {/* Mobile Right Controls: Hamburger */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
        <button 
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "CLOSE [X]" : "MENU [=]"}
        </button>

        {/* Navigation Wrapper (Pill on Desktop, Dropdown on Mobile) */}
        <div className={`nav-pill-wrapper ${isMenuOpen ? 'open' : ''}`} style={{ pointerEvents: "none" }}>
          <nav
            aria-label="Main navigation"
            className="nav-pill"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  display: "block",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: pathname === href ? "#AAFF00" : "#000",
                  background: pathname === href ? "#000" : "transparent",
                  padding: "0.5rem 1.35rem",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* CTA */}
      <div className="nav-cta">
        <Link
          href="/contact"
          style={{
            textDecoration: "none",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "#fff",
            background: "transparent",
            padding: "0.5rem 1.35rem",
            borderRadius: "999px",
            border: "1.5px solid rgba(255,255,255,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          Get Started →
        </Link>
      </div>
    </header>
    </>
  );
}
