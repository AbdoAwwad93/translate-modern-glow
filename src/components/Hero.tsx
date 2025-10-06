import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(200 65% 18%) 0%, hsl(200 60% 22%) 50%, hsl(200 55% 26%) 100%)`,
      }}
    >
      {/* Dotted Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(45 90% 55%) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Hero Background Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={heroBg}
          alt="ASH Translation"
          className="max-w-3xl w-full opacity-20 animate-float"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            ASH TRANSLATION
            <span className="block text-accent mt-2">CO LTD</span>
          </h1>

          <p className="text-2xl md:text-3xl text-accent mb-8 font-semibold animate-fade-in-up animation-delay-200">
            Bridging Communication Among People
          </p>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Professional translation services in 100+ languages, connecting
            businesses and individuals across the globe with precision and
            cultural expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold group text-lg px-8"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8"
            >
              Our Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in animation-delay-800">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                100+
              </div>
              <div className="text-primary-foreground/80">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                50+
              </div>
              <div className="text-primary-foreground/80">Linguists</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                24/7
              </div>
              <div className="text-primary-foreground/80">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                ISO
              </div>
              <div className="text-primary-foreground/80">Certified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
