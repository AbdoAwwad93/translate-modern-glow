"use client";
import { motion } from "framer-motion";
import { useState } from "react";
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
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const additionalServices = [
    {
      icon: FileText,
      name: "Localization",
      description:
        "Our Localization service goes beyond simple translation — it's about making your message feel native to your target audience. We adapt your content to fit the linguistic, cultural, and regional nuances of each market, ensuring your brand speaks with authenticity and impact.",
    },
    {
      icon: CheckCircle,
      name: "Reviewing",
      description:
        "Our Reviewing service ensures that your translated content achieves the highest standards of accuracy and fluency. Every document is meticulously examined by professional linguists who refine grammar, style, consistency, and terminology according to your preferred tone and field.",
    },
    {
      icon: Type,
      name: "Typing",
      description:
        "Our Typing service offers precise, efficient, and confidential data entry and document typing in multiple languages and formats. From handwritten manuscripts and legal files to scanned documents and audio notes, we transform your materials into clean, editable, and professionally formatted text.",
    },
    {
      icon: Layout,
      name: "DTP (Desktop Publishing)",
      description:
        "Our Desktop Publishing (DTP) service ensures that your translated materials maintain their professional design and visual appeal across all languages. We handle complex layouts, fonts, and formatting challenges that arise when adapting multilingual content.",
    },
    {
      icon: Palette,
      name: "Designing",
      description:
        "Our Designing service brings your brand to life through creative visuals that communicate clearly across languages and cultures. We design marketing materials, digital content, and brand assets that align with your corporate identity and appeal to diverse audiences.",
    },
    {
      icon: Subtitles,
      name: "Subtitling",
      description:
        "Our Subtitling service transforms your video content into a multilingual experience that connects with audiences worldwide. We provide accurate, time-coded subtitles that preserve your message's tone, style, and intent.",
    },
    {
      icon: Edit,
      name: "Editing",
      description:
        "Our Editing service refines your content to perfection. We focus on structure, tone, and clarity to ensure that your documents are not only error-free but also engaging and impactful. Our expert editors enhance sentence flow and eliminate inconsistencies.",
    },
    {
      icon: Mic,
      name: "Transcription",
      description:
        "Our Transcription service converts your audio and video recordings into accurate, well-formatted text in any language. From interviews, conferences, and podcasts to legal or medical dictations, we ensure verbatim precision, clarity, and confidentiality.",
    },
    // {
    //   icon: Code,
    //   name: "Full Stack Development",
    //   description:
    //     "Our Full Stack Development service combines technical expertise and linguistic insight to build multilingual digital platforms that perform flawlessly worldwide. From front-end design to back-end architecture, our developers create responsive, secure, and scalable solutions.",
    // },
    // {
    //   icon: Layout,
    //   name: "Web Designing",
    //   description:
    //     "Our Web Designing service merges creative aesthetics with functionality to deliver multilingual websites that captivate and convert. We design user-friendly interfaces optimized for accessibility, speed, and cross-cultural appeal.",
    // },
    {
      icon: CheckCircle,
      name: "Auditing",
      description:
        "Our Auditing service provides a comprehensive linguistic and technical review of your translated or localized content. We evaluate accuracy, consistency, formatting, and compliance with your corporate and industry standards.",
    },
    {
      icon: Languages,
      name: "Custom Solutions",
      description:
        "Every business has unique needs — and our Custom Solutions service is designed to meet them. We combine our linguistic expertise, technical skills, and creative thinking to build tailored solutions that address your specific translation, localization, or communication challenges.",
    },
  ];

  return (
    <motion.section
      id="services"
      className="py-20 bg-background"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-accent">Services</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive language and business solutions tailored to your needs
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-20">
          <Card className="p-10 md:p-16 border-2 border-accent/30 hover:border-accent transition-all duration-500 shadow-2xl hover:shadow-accent/20 bg-gradient-to-br from-card via-background to-muted relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center text-center gap-8">
              <div className="bg-accent/10 p-8 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                <Languages className="w-20 h-20 text-accent" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6 leading-tight">
                  Language Translation
                </h3>
                <p className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed max-w-3xl">
                  Professional Translation Services: English ↔ Arabic and All
                  Language Pairs
                </p>
              </div>
              <div className="mt-4 px-6 py-3 bg-accent/10 rounded-full">
                <p className="text-accent font-semibold text-lg">
                  Our Core Expertise
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Additional Professional Services
          </h3>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
            Explore our comprehensive range of specialized services designed to
            support your global communication needs
          </p>

          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`w-full p-8 hover:shadow-2xl transition-all duration-300 border-border group cursor-pointer rounded-2xl bg-gradient-to-br from-background via-card to-muted hover:-translate-y-2 ${
                    expandedService === index
                      ? "ring-2 ring-accent shadow-accent/30 scale-[1.01]"
                      : ""
                  }`}
                  onClick={() =>
                    setExpandedService(expandedService === index ? null : index)
                  }
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                        <service.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h4 className="font-bold text-xl text-card-foreground">
                        {service.name}
                      </h4>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-accent transition-transform duration-300 self-end md:self-center ${
                        expandedService === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedService === index
                        ? "max-h-96 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-base leading-relaxed border-t border-border pt-4">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-muted/50 rounded-2xl border border-border">
            <p className="text-muted-foreground text-lg font-medium">
              Additional specialized services available upon request —{" "}
              <span className="text-accent font-semibold">
                we're here to meet your unique needs
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
