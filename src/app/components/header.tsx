"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-black"
          onClick={() => setIsMenuOpen(false)}
        >
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {menuItems.map((item) => {
            const active = isActiveLink(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-black" />
                )}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-black md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          {isMenuOpen ? (
            // Close Icon
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav
          className="border-t border-gray-200 bg-white px-4 py-5 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {menuItems.map((item) => {
              const active = isActiveLink(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-lg bg-black px-4 py-3 text-center text-sm font-medium text-white"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}