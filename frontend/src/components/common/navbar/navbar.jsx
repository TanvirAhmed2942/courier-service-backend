"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((p) => !p);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/70 backdrop-blur border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Logo */}
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
        >
          <Package className="h-6 w-6" />
          <span>Courier</span>
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={toggle}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 md:hidden focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Center links (desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Login
          </Link>
          <Button size="sm" className="px-4">
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t border-border bg-white dark:bg-black",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-3 px-4 py-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-border my-1" />
          <Link
            href="/auth/login"
            onClick={close}
            className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Login
          </Link>
          <Button size="sm" className="w-full" onClick={close}>
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
