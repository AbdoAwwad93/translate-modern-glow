import {
  Languages,
  FileText,
  Type,
  Layout,
  Subtitles,
  Edit,
  Mic,
  Code,
  Palette,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const mainServices = [
    {
      icon: Languages,
      title: "Language Translation",
      description: "English to Arabic & vice versa, plus all other language pairs",
      color: "text-accent",
    },
  ];

  const additionalServices = [
    { icon: FileText, name: "Localization" },
    { icon: CheckCircle, name: "Reviewing" },
    { icon: Type, name: "Typing" },
    { icon: Layout, name: "DTP" },
    { icon: Palette, name: "Designing" },
    { icon: Subtitles, name: "Subtitling" },
    { icon: Edit, name: "Editing" },
    { icon: Mic, name: "Transcription" },
    { icon: Code, name: "Full Stack Development" },
    { icon: Layout, name: "Web Designing" },
    { icon: CheckCircle, name: "Auditing" },
    { icon: Languages, name: "Custom Solutions" },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-accent">Services</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive language and business solutions tailored to your needs
          </p>
        </div>

        {/* Main Service - Translation */}
        <div className="max-w-4xl mx-auto mb-16">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className="p-8 md:p-12 border-2 border-accent/20 hover:border-accent transition-all duration-300 hover:shadow-gold animate-scale-in bg-gradient-to-br from-card to-muted"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-accent/10 p-6 rounded-2xl">
                  <service.icon className={`w-16 h-16 ${service.color}`} />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-3xl font-bold text-card-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Services Grid */}
        <div>
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Additional Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-muted rounded-xl group-hover:bg-accent/10 transition-colors">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-semibold text-card-foreground">
                    {service.name}
                  </h4>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            Any other required relevant services can also be secured upon request
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
