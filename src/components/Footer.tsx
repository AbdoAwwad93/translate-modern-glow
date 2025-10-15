"use client";

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground py-16 mt-20 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-accent/5 blur-3xl opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="ASH Translation"
                className="h-12 w-12 rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-accent font-bold text-lg tracking-wide">
                  ASH TRANSLATION
                </h3>
                <p className="text-accent/70 text-sm">CO LTD</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              Bridging Communication Among People. Expert translation services
              in 100+ languages, powered by a team of skilled linguists since
              2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent font-semibold mb-5 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Expertise", href: "#expertise" },
                { label: "Contact", href: "#contact" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-accent font-semibold mb-5 text-lg">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" /> info@ashtranslation.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" /> +44 1234 567890
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" /> London, United
                Kingdom
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-accent font-semibold mb-5 text-lg">
              Company Info
            </h4>
            <p className="text-primary-foreground/80 text-sm mb-2">
              Company Number: 15944153
            </p>
            <p className="text-primary-foreground/80 text-sm mb-2">
              Registered in England and Wales
            </p>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Founded: September 9th, 2024
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-accent/10 rounded-full hover:bg-accent/20 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-accent" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm tracking-wide">
            © {new Date().getFullYear()}{" "}
            <span className="text-accent font-medium">
              ASH Translation Co Ltd
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
