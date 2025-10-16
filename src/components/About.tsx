import { Globe, Target, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import image from "@/assets/Ahmed Samy.jpg";

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
              as an international translation agency with global reach,
              delivering top-tier service and support in over 100 languages,
              backed by a network of more than expert 50 linguists around the
              world.
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

        {/* Founder's Message */}
        <div className="mb-16 animate-fade-in">
          <Card className="p-8 md:p-12 border-border bg-card shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                A Message from Our Founder
              </h3>
              <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
              {/* Founder Image */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent shadow-lg">
                  <img
                    src={image}
                    alt="Ahmed Samy - Founder of ASH Translation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  <strong className="text-foreground">
                    Welcome to ASH Translation Co LTD!
                  </strong>
                </p>

                <p>
                  As the founder, it's my pleasure to introduce you to a company
                  where ASH stands for Global Translation Services. We've
                  dedicated ourselves to achieving a truly international
                  presence, and today, we are proud to be an international
                  translation agency with global reach. Our commitment is backed
                  by a robust network of over 50 expert linguists operating
                  worldwide, enabling us to deliver top-tier service and support
                  in over 100 languages.
                </p>

                <p>
                  At the heart of our vision lies one non-negotiable priority:
                  client satisfaction—delivered consistently through timely,
                  accurate, and impactful translation services. Our mission is
                  foundational: to build strong bridges of communication across
                  languages and cultures, connecting people and enabling
                  businesses to thrive globally. We've built a rich history of
                  dealing with diverse customers and supporting both
                  international and local businesses at all operational levels.
                </p>

                <p>
                  We are deeply committed to providing you with top-quality,
                  certified, and professional translation services. Reliability
                  is critical, which is why we operate with proven quality
                  assurance processes designed to ensure reliable and consistent
                  results across every single project. We offer comprehensive
                  language and business services, meticulously tailored to your
                  unique needs, guaranteeing a perfect fit for your goals.
                </p>

                <p>
                  Your satisfaction remains our top priority, and we ensure this
                  through responsive and passionate service. Our dedicated
                  project management team is available 24/7 and promptly
                  responds to your every need. Our passion lies in the
                  exceptional service and unprecedented quality we provide, all
                  managed through our proven and efficient process.
                </p>

                <p className="text-lg">
                  We look forward to being your trusted partner in achieving
                  seamless, high-impact global communication.
                </p>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-foreground font-semibold text-lg">
                    Ahmed Samy
                  </p>
                  <p className="text-sm text-muted-foreground">Founder</p>
                  <p className="text-sm text-accent font-medium">
                    ASH Translation Co LTD
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-primary to-secondary p-8 md:p-12 rounded-2xl shadow-navy animate-fade-in">
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl text-primary-foreground font-medium italic mb-4">
              "At the heart of our vision lies client satisfaction — delivered
              through timely, accurate, and impactful translation services. Our
              mission is to build strong bridges of communication across
              languages and cultures, connecting people worldwide."
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
