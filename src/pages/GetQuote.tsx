"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import ServicesNavbar from "@/components/services-navbar";

export default function ServiceRequestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    languagePairFrom: "",
    languagePairTo: "",
    wordCount: "",
    pageCount: "",
    deadline: "",
    additionalNotes: "",
    preferredContact: "email",
  });

  const serviceTypes = [
    "Translation",
    "Localization",
    "Reviewing",
    "Typing",
    "DTP (Desktop Publishing)",
    "Designing",
    "Subtitling",
    "Editing",
    "Transcription",
    "Auditing",
    "Custom Solutions",
    "Other",
  ];

  const languages = [
    "English",
    "Arabic",
    "French",
    "German",
    "Spanish",
    "Mandarin",
    "Japanese",
    "Korean",
    "Portuguese",
    "Russian",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: value,
    }));
    setSelectedService(value);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          serviceType: "",
          languagePairFrom: "",
          languagePairTo: "",
          wordCount: "",
          pageCount: "",
          deadline: "",
          additionalNotes: "",
          preferredContact: "email",
        });
        setSelectedService("");
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ServicesNavbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgb(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 text-balance">
              Get Your <span className="text-accent">Quote Today</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fill out your project details and our team will provide a
              professional quote within 24 hours
            </p>
          </motion.div>

          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl border border-accent/30 shadow-lg"
            >
              <p className="text-foreground font-semibold text-lg flex items-center gap-2">
                <span className="text-accent text-2xl">✓</span>
                Your request submitted successfully! We'll contact you shortly.
              </p>
            </motion.div>
          )}

          {/* Form Container */}
          <motion.div
            className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="p-8 sm:p-12">
              {/* Grid Layout */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Phone with International Support */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Include country code (e.g., +1, +44, +971)
                    </p>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Service Type *
                    </label>
                    <Select
                      value={selectedService}
                      onValueChange={handleServiceChange}
                    >
                      <SelectTrigger className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20">
                        <SelectValue placeholder="Select your service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Preferred Contact */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Contact Preference *
                    </label>
                    <Select
                      value={formData.preferredContact}
                      onValueChange={(value) =>
                        handleSelectChange("preferredContact", value)
                      }
                    >
                      <SelectTrigger className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Page Count *
                    </label>
                    <Input
                      type="number"
                      name="pageCount"
                      value={formData.pageCount}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Word Count
                      </label>
                      <Input
                        type="number"
                        name="wordCount"
                        value={formData.wordCount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Required Deadline
                    </label>
                    <Input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  {/* Language Pair (Only for Translation) */}
                  {selectedService === "Translation" && (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            From Language *
                          </label>
                          <Select
                            value={formData.languagePairFrom}
                            onValueChange={(value) =>
                              handleSelectChange("languagePairFrom", value)
                            }
                          >
                            <SelectTrigger className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {languages.map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                  {lang}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            To Language *
                          </label>
                          <Select
                            value={formData.languagePairTo}
                            onValueChange={(value) =>
                              handleSelectChange("languagePairTo", value)
                            }
                          >
                            <SelectTrigger className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {languages.map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                  {lang}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Full Width Section */}
              <div className="mt-8">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Tell us more about your project
                </label>
                <Textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-10 flex gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  {isLoading ? "Submitting..." : "Get Your Quote"}
                </Button>
              </div>

              {/* Info Text */}
              <p className="text-center text-muted-foreground text-sm mt-6">
                We'll review your request and get back to you within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
