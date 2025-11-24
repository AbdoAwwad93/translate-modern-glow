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
import { motion, AnimatePresence } from "framer-motion";
import ServicesNavbar from "@/components/services-navbar";
import { orderService } from "../services/order-service";
import type { OrderCreateDto } from "../types/index";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function ServiceRequestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      // ✅ Auto-enforce English rule for translation service
      if (selectedService === "Translation") {
        if (name === "languagePairFrom" && value !== "English") {
          updated.languagePairTo = "English";
        } else if (name === "languagePairTo" && value !== "English") {
          updated.languagePairFrom = "English";
        }
      }

      return updated;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles([file]);
    }
    e.target.value = "";
  };

  const handleRemoveFile = () => {
    setUploadedFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      // Validate required fields first
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.deadline ||
        !formData.pageCount ||
        !selectedService ||
        !formData.preferredContact ||
        uploadedFiles.length === 0 ||
        (selectedService === "Translation" &&
          (!formData.languagePairFrom || !formData.languagePairTo))
      ) {
        setError(
          "Please fill in all required fields including the file upload."
        );
        setIsLoading(false);
        return;
      }

      // ✅ NEW RULE: Must include English for Translation
      if (
        selectedService === "Translation" &&
        formData.languagePairFrom !== "English" &&
        formData.languagePairTo !== "English"
      ) {
        setError(
          "For translation services, either the source or target language must be English."
        );
        setIsLoading(false);
        return;
      }

      const dto: OrderCreateDto = {
        CustomerName: formData.fullName,
        CustomerEmail: formData.email,
        CustomerPhoneNumber: formData.phone,
        DeadLine: new Date(formData.deadline).toISOString(),
        Notes: formData.additionalNotes || "",
        PageCount: parseInt(formData.pageCount),
        WordCount: parseInt(formData.wordCount || "0"),
        PreferredContact: formData.preferredContact,
        Services: [selectedService],
        SourceLanguage: formData.languagePairFrom || undefined,
        TargetLanguage: formData.languagePairTo || undefined,
        File: uploadedFiles[0],
      };

      const result = await orderService.makeOrder(dto);

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
      setUploadedFiles([]);

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Auto-hide success message after 8 seconds
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (error: any) {
      console.error("Error submitting order:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit order. Please try again."
      );
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
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-green-600/10 rounded-2xl border-2 border-green-500/30 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-700 mb-1">
                      Quote Request Sent Successfully!
                    </h3>
                    <p className="text-green-600 text-sm leading-relaxed">
                      Thank you for your request! Our team has received your
                      information and will review it carefully. We'll contact
                      you within 24 hours with a detailed quote.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="flex-shrink-0 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-red-600/10 rounded-2xl border-2 border-red-500/30 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <AlertCircle className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-700 mb-1">
                      Unable to Submit Request
                    </h3>
                    <p className="text-red-600 text-sm leading-relaxed">
                      {error}
                    </p>
                  </div>
                  <button
                    onClick={() => setError("")}
                    className="flex-shrink-0 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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

                  <div className="grid grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Page Count *
                      </label>
                      <Input
                        type="number"
                        name="pageCount"
                        value={formData.pageCount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Required Deadline *
                    </label>
                    <Input
                      type="datetime-local"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      required
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

              <div className="mt-8">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Upload Project Files *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx,.zip"
                  />

                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-accent/40 rounded-xl bg-accent/5 hover:bg-accent/10 cursor-pointer transition-colors"
                  >
                    <div className="text-center">
                      <svg
                        className="w-10 h-10 mx-auto mb-2 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-foreground font-medium">
                        Click to upload
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Supported: PDF, DOC, DOCX, TXT, XLSX, PPTX, ZIP
                      </p>
                    </div>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <motion.div
                    className="mt-4 space-y-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      Uploaded Files ({uploadedFiles.length})
                    </p>
                    {uploadedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <svg
                            className="w-5 h-5 text-accent flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                          </svg>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile()}
                          className="ml-2 text-muted-foreground hover:text-accent transition-colors flex-shrink-0"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-10 flex gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
