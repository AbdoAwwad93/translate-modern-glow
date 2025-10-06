import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="ASH Translation" className="h-12 w-12" />
              <div>
                <h3 className="text-accent font-bold text-lg">
                  ASH TRANSLATION
                </h3>
                <p className="text-accent/80 text-sm">CO LTD</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Bridging Communication Among People. Professional translation
              services in 100+ languages since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Expertise
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Company Details */}
          <div>
            <h4 className="text-accent font-semibold mb-4">Company Info</h4>
            <p className="text-primary-foreground/80 text-sm mb-2">
              Company Number: 15944153
            </p>
            <p className="text-primary-foreground/80 text-sm mb-2">
              Registered in England and Wales
            </p>
            <p className="text-primary-foreground/80 text-sm">
              Founded: September 9th, 2024
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} ASH Translation Co Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
