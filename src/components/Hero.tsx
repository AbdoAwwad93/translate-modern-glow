"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import image from "@/assets/hero-bg.png";
import "@/components/css/hero.css";
const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-32"
        style={{
          background: `linear-gradient(135deg, hsl(200 65% 18%) 0%, hsl(200 60% 22%) 50%, hsl(200 55% 26%) 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234, 179, 8, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 179, 8, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up">
                ASH TRANSLATION
                <span className="block text-accent mt-2">CO LTD</span>
              </h1>

              <p className="text-2xl md:text-3xl text-accent mb-6 font-semibold animate-fade-in-up delay-100">
                Bridging Communication Among People
              </p>

              <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 leading-relaxed animate-fade-in-up delay-200">
                Professional translation services in 100+ languages, connecting
                businesses and individuals across the globe with precision and
                cultural expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 mb-20">
                <Button
                  size="lg"
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-accent/90 group text-lg px-8 py-6 button-3d"
                >
                  <a href="#contact">
                    Get Started
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 bg-transparent button-3d"
                >
                  <a href="#services">Our Services</a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-400">
                {[
                  { value: "100+", label: "Languages" },
                  { value: "50+", label: "Linguists" },
                  { value: "24/7", label: "Support" },
                  { value: "ISO", label: "Certified" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`card-3d glass-card rounded-xl p-5 cursor-default delay-${
                      (i + 5) * 100
                    }`}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/80 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 max-w-xl lg:max-w-2xl animate-fade-in-right">
              <div className="relative float-gentle">
                <img
                  src={image}
                  alt="Professional Translation Services"
                  className="w-full rounded-2xl shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(234, 179, 8, 0.25))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
