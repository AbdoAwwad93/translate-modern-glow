import { Element } from "react-scroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
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
