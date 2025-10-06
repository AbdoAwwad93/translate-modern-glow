import { Globe, Target, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "International translation agency with services in over 100 languages worldwide",
    },
    {
      icon: Target,
      title: "Client Focused",
      description:
        "24/7 support and ISO-certified project management ensuring your satisfaction",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "50+ professional linguists dedicated to delivering exceptional quality",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Timely, accurate, and cost-effective translation services since 2024",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-accent">ASH Translation</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-slide-in-right">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Breaking Language Barriers, Building Connections
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ASH TRANSLATION CO LTD is a UK-based translation company founded
              in 2024, dedicated to providing high-quality, professional
              translation services. We have evolved to offer a full range of
              timely, accurate, and cost-effective solutions to public sector
              institutions, law firms, advertising agencies, contracting
              companies, banks, and financial institutions.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ASH stands for Global Translation Services. We've earned our name
              by being an international translation agency with global reach,
              providing the best service and support in over 50 languages with
              language expertise in every part of the world.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to add unprecedented positive contribution to the
              world in the field of language communication and bring the world
              closer to one yard without any language barrier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border bg-card animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <h4 className="text-xl font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-primary to-secondary p-8 md:p-12 rounded-2xl shadow-navy animate-fade-in">
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl text-primary-foreground font-medium italic mb-4">
              "The Core and Crux of our vision is the satisfaction of our
              clients through timely and effective Translation Services. Our
              main goal is to extend the bridges of communication between people
              of different languages and cultures."
            </p>
            <footer className="text-accent font-semibold">
              — ASH Translation Co Ltd
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
