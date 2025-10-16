"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Gradient background with animated glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="ASH Translation"
                className="h-12 w-12 rounded-xl shadow-lg"
              />
              <div>
                <h3 className="text-accent font-bold text-xl tracking-wide">
                  ASH TRANSLATION
                </h3>
                <p className="text-accent/80 text-xs font-medium">CO LTD</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Bridging communication across 100+ languages with precision and
              cultural expertise.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-accent font-semibold mb-4 text-sm uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@ashtranslation.com"
                className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors group"
              >
                <Mail className="w-4 h-4 mt-0.5 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">info@ashtranslation.com</span>
              </a>
              <a
                href="tel:+441234567890"
                className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors group"
              >
                <Phone className="w-4 h-4 mt-0.5 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">+44 1234 567890</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm">London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-accent font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/70 mb-6">
              <p>Registered in England and Wales</p>
              <p>Founded: September 9th, 2024</p>
            </div>

            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-primary-foreground/70 group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="text-accent font-medium">
                ASH Translation Co Ltd
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
