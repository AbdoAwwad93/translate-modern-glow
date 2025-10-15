import {
  Building2,
  Scale,
  Stethoscope,
  TrendingUp,
  Shield,
  FileCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const Expertise = () => {
  const expertiseAreas = [
    {
      icon: Building2,
      title: "Banking & Financial",
      items: [
        "ICR Reports & Balance Sheets",
        "Financial Statements",
        "Management Consulting",
        "Annual & Audit Reports",
        "IPO & Feasibility Studies",
        "Tax Documents & Declarations",
      ],
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Scale,
      title: "Legal Translation",
      items: [
        "Articles & Memorandums",
        "Contracts & Agreements",
        "Power of Attorneys",
        "Laws & Regulations",
        "Legal Correspondence",
        "Court Documents",
      ],
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Stethoscope,
      title: "Medical Translation",
      items: [
        "Medical Reports",
        "Lab Analyses",
        "Drug Leaflets",
        "Patient Records",
        "Clinical Studies",
        "Medical Certificates",
      ],
      gradient: "from-secondary/30 to-secondary/5",
    },
    {
      icon: TrendingUp,
      title: "Deal Advisory",
      items: [
        "Economic Reports",
        "Market Analysis",
        "Business Proposals",
        "Strategic Documents",
        "Investment Papers",
        "Consulting Reports",
      ],
      gradient: "from-accent/15 to-accent/5",
    },
    {
      icon: Shield,
      title: "Insurance",
      items: [
        "Policy Documents",
        "Claims Forms",
        "Coverage Details",
        "Risk Assessments",
        "Insurance Contracts",
        "Regulatory Filings",
      ],
      gradient: "from-primary/15 to-primary/5",
    },
    {
      icon: FileCheck,
      title: "General Services",
      items: [
        "Email Translation",
        "Document Stamping",
        "Hardcopy Delivery",
        "Rush Services",
        "Quality Assurance",
        "Client Support",
      ],
      gradient: "from-secondary/20 to-secondary/5",
    },
  ];

  return (
    <section id="expertise" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Industry-Specific <span className="text-accent">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional translation solutions tailored to the unique demands of
            each sector, powered by subject-matter specialists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <Card
              key={index}
              className={`p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border bg-gradient-to-br ${area.gradient} animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <area.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground flex-1">
                  {area.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {area.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Delivery Process */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-card border-2 border-accent/20">
            <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Receipt & Delivery Process
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  1
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  Receive
                </h4>
                <p className="text-sm text-muted-foreground">
                  Documents via email
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  2
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  Translate & Stamp
                </h4>
                <p className="text-sm text-muted-foreground">
                  Professional translation with official stamping
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  3
                </div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  Deliver
                </h4>
                <p className="text-sm text-muted-foreground">
                  Scanned copy via email & hardcopy to your headquarters
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
