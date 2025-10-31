"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const ServicesNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary/95 backdrop-blur-md shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Go Home */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src={logo}
              alt="ASH Translation Co Ltd"
              className="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden md:block">
              <h1 className="text-accent font-bold text-xl">ASH TRANSLATION</h1>
              <p className="text-accent/80 text-xs">CO LTD</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ServicesNavbar;
