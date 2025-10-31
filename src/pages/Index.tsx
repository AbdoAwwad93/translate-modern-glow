import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Element, scroller } from "react-scroll";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // If another page navigates here and specifies a section to scroll to
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 800,
        offset: -80, // adjust for your Navbar height
      });
    } else {
      // Default: scroll to top when loading home page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <Element name="home">
        <Hero />
      </Element>

      <Element name="about">
        <About />
      </Element>

      <Element name="services">
        <Services />
      </Element>

      <Element name="expertise">
        <Expertise />
      </Element>

      <Element name="contact">
        <Contact />
      </Element>

      <Footer />
    </div>
  );
};

export default Index;
