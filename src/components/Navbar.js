"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar-floating">
      <div className="navbar-inner">
        <ul className="navbar-links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`navbar-link ${pathname === href ? "active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="navbar-logo">
          alihahamed
        </Link>

        <div className="navbar-actions">
          <Link href="/contact" className="navbar-signin">
            Sign in
          </Link>
          <Link href="/about" className="navbar-cta">
            Get Started →
          </Link>
        </div>
      </div>
    </nav>
  );
}
