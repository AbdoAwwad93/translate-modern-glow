import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Services", to: "services" },
    { name: "Expertise", to: "expertise" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg"
          : "bg-primary/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={600}
            className="flex items-center gap-3 group cursor-pointer"
          >
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={600}
                offset={-80} // adjust for navbar height
                spy={true}
                activeClass="text-accent"
                className="text-primary-foreground hover:text-accent transition-colors duration-300 font-medium relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              to="contact"
              smooth={true}
              duration={600}
              offset={-80}
              spy={true}
            >
              <Button
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold"
              >
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-primary-foreground hover:text-accent transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="contact"
              smooth={true}
              duration={600}
              offset={-80}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant="default"
                className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Get Quote
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
