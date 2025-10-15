import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "info@ashtranslation.com",
      link: "mailto:info@ashtranslation.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+44 (0) 123 456 7890",
      link: "tel:+441234567890",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "United Kingdom",
      link: "#",
    },
    {
      icon: Clock,
      title: "Support",
      detail: "24/7 Available",
      link: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-accent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get in Touch Ready to bridge language gaps? Reach out today for your
            free, no-obligation quote.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <info.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                {info.title}
              </h3>
              <a
                href={info.link}
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                {info.detail}
              </a>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary via-secondary to-primary text-center shadow-navy">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start Your Translation Project?
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust ASH TRANSLATION CO.
              LTD. for accurate, timely, and professional multilingual
              solutions. Request your free quote today and take the first step
              toward seamless global communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8"
              >
                Request a Quote
              </Button>
            </div>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-accent font-bold text-2xl mb-2">
              Commitment to Quality{" "}
            </div>
            <p className="text-muted-foreground">
              Proven quality assurance processes for reliable and
              consistent results
            </p>
          </div>
          <div className="text-center">
            <div className="text-accent font-bold text-2xl mb-2">
              Secure & Confidential
            </div>
            <p className="text-muted-foreground">Your data is protected</p>
          </div>
          <div className="text-center">
            <div className="text-accent font-bold text-2xl mb-2">
              Fast Turnaround
            </div>
            <p className="text-muted-foreground">Rush services available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
