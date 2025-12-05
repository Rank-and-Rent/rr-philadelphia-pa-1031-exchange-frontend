"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { FormEvent } from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from "@heroicons/react/24/outline";

// Site configuration
const SITE_URL = "https://www.1031exchangephiladelphia.com";
const PRIMARY_CITY = "Philadelphia";
const PRIMARY_STATE_ABBR = "PA";
const PHONE_DISPLAY = "(215) 774-2734";
const PHONE_E164 = "+12157742734";
const CONTACT_EMAIL = "intake@1031exchangephiladelphia.com";
const OFFICE_ADDRESS = "3151 Market St";
const OFFICE_CITY_STATE_ZIP = "Philadelphia, PA 19104";
const OFFICE_ADDRESS_FULL = "3151 Market St, Philadelphia, PA 19104";

// Extend window type for Turnstile
declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    _lastTurnstileToken?: string;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

// Utility to load Turnstile script exactly once
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._turnstileLoaded) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      window._turnstileLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => {
      window._turnstileLoaded = true;
      resolve();
    };
    s.onerror = () => {
      console.error("Failed to load Turnstile script");
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(s);
  });
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Contact" }
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  city: string;
  property: string;
  estimatedCloseDate: string;
  company: string;
  timeline: string;
  message: string;
};

function ContactForm() {
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    city: "",
    property: "",
    estimatedCloseDate: "",
    company: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Load Turnstile script
  useEffect(() => {
    let cancelled = false;
    const initTimeout = setTimeout(async () => {
      if (cancelled) return;
      if (!siteKey) return;

      try {
        await loadTurnstile();
        if (cancelled) return;

        if (!window.turnstile) {
          console.error("Turnstile API not available");
          return;
        }

        if (!captchaRef.current) {
          console.error("Turnstile ref not mounted");
          return;
        }

        const id: string = window.turnstile.render(captchaRef.current, {
          sitekey: siteKey,
          size: "normal",
          callback: () => {
            setTurnstileReady(true);
          },
          "error-callback": () => {
            console.warn("Turnstile error");
            setTurnstileReady(false);
          },
          "timeout-callback": () => {
            console.warn("Turnstile timeout");
            setTurnstileReady(false);
          },
        });
        setTurnstileId(id);
        setTurnstileReady(true);
        console.log("Turnstile initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Turnstile:", error);
        setTurnstileReady(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
    };
  }, [siteKey]);


  // Scroll to contact form when hash is present
  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.projectType.trim()) newErrors.projectType = "Required";
    // city, property, estimatedCloseDate, company, timeline, and message are all optional

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFeedback("Please complete all required fields.");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFeedback("");

    try {
      // Verify Turnstile is ready
      if (siteKey && (!turnstileReady || !window.turnstile || !turnstileId)) {
        setFeedback("Please complete the security verification.");
        setStatus("error");
        return;
      }

      // Get Turnstile token
      let turnstileToken = '';
      if (siteKey && window.turnstile && turnstileId) {
        try {
          // Reset before executing to avoid "already executed" error
          window.turnstile.reset(turnstileId);
          turnstileToken = await new Promise<string>((resolve, reject) => {
            if (!window.turnstile) {
              reject(new Error("Turnstile not available"));
              return;
            }
            window.turnstile.execute(turnstileId, {
              async: true,
              action: "form_submit",
              callback: (t: string) => resolve(t),
              "error-callback": () => reject(new Error("turnstile-error")),
              "timeout-callback": () => reject(new Error("turnstile-timeout")),
            });
          });
        } catch (err) {
          console.error("Turnstile execution error:", err);
          setFeedback("Security verification failed. Please try again.");
          setStatus("error");
          if (window.turnstile && turnstileId) {
            window.turnstile.reset(turnstileId);
          }
          return;
        }
      }

      // Prepare phone number (digits only)
      const phoneDigits = formData.phone.replace(/\D/g, '');

      // Submit to API
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: phoneDigits,
          projectType: formData.projectType,
          city: formData.city,
          property: formData.property,
          estimatedCloseDate: formData.estimatedCloseDate,
          company: formData.company,
          timeline: formData.timeline,
          details: formData.message,
          "cf-turnstile-response": turnstileToken,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          city: "",
          property: "",
          estimatedCloseDate: "",
          company: "",
          timeline: "",
          message: "",
        });
        // Reset turnstile
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
        setStatus("success");
        setFeedback("Thank you. A Philadelphia exchange specialist will follow up within one business day.");
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }));
        setFeedback(errorData.error || 'Failed to submit form. Please try again.');
        setStatus("error");
        // Reset turnstile on error
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFeedback("An error occurred. Please try again or contact us directly.");
      setStatus("error");
      // Reset turnstile on error
      if (window.turnstile && turnstileId) {
        window.turnstile.reset(turnstileId);
      }
    }
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-[#14213D] md:text-4xl">
            Contact 1031 Exchange {PRIMARY_CITY}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            Ready to start your 1031 exchange? Our {PRIMARY_CITY} team specializes in connecting investors with compliant replacement properties across Pennsylvania.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div id="contact-form" className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#14213D]">
              Start Your Exchange Plan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <fieldset disabled={status === "submitting"} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange("name")}
                      aria-describedby={errors.name ? "name-error" : "name-helper"}
                      aria-invalid={!!errors.name}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    />
                    {errors.name ? (
                      <p id="name-error" className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    ) : (
                      <p id="name-helper" className="mt-1 text-xs text-gray-500">
                        Primary investor or advisor name
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange("email")}
                      aria-describedby={errors.email ? "email-error" : "email-helper"}
                      aria-invalid={!!errors.email}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    />
                    {errors.email ? (
                      <p id="email-error" className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    ) : (
                      <p id="email-helper" className="mt-1 text-xs text-gray-500">
                        We send a confirmation and documentation checklist
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      aria-describedby={errors.phone ? "phone-error" : "phone-helper"}
                      aria-invalid={!!errors.phone}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    />
                    {errors.phone ? (
                      <p id="phone-error" className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    ) : (
                      <p id="phone-helper" className="mt-1 text-xs text-gray-500">
                        We confirm timelines by phone within one business day
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-900">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange("company")}
                      aria-describedby="company-helper"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    />
                    <p id="company-helper" className="mt-1 text-xs text-gray-500">
                      Company or organization name (optional)
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-gray-900">
                    Service <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange("projectType")}
                    aria-describedby={errors.projectType ? "projectType-error" : "projectType-helper"}
                    aria-invalid={!!errors.projectType}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                  >
                    <option value="">Select a service</option>
                    <option value="Forward Exchange Structuring">Forward Exchange Structuring</option>
                    <option value="Reverse Exchange Structuring">Reverse Exchange Structuring</option>
                    <option value="Replacement Property Scouting">Replacement Property Scouting</option>
                    <option value="Property Identification">Property Identification</option>
                    <option value="NNN Retail Identification">NNN Retail Identification</option>
                    <option value="Multifamily 1031 Identification">Multifamily 1031 Identification</option>
                    <option value="Industrial Flex Identification">Industrial Flex Identification</option>
                    <option value="Delaware Statutory Trust Placement">Delaware Statutory Trust Placement</option>
                    <option value="Improvement Exchange Construction">Improvement Exchange Construction</option>
                    <option value="Timeline Discipline Program">Timeline Discipline Program</option>
                    <option value="Form 8824 Preparation Support">Form 8824 Preparation Support</option>
                    <option value="Boot Minimization Strategy">Boot Minimization Strategy</option>
                    <option value="Exchange Consultation">Exchange Consultation</option>
                  </select>
                  {errors.projectType ? (
                    <p id="projectType-error" className="mt-1 text-sm text-red-600">
                      {errors.projectType}
                    </p>
                  ) : (
                    <p id="projectType-helper" className="mt-1 text-xs text-gray-500">
                      Select the service you are interested in
                    </p>
                  )}
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange("city")}
                      aria-describedby="city-helper"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    />
                    <p id="city-helper" className="mt-1 text-xs text-gray-500">
                      Primary metro or submarket (optional)
                    </p>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="mb-2 block text-sm font-medium text-gray-900">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleChange("timeline")}
                      aria-describedby="timeline-helper"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    >
                      <option value="">Select timeline (optional)</option>
                      <option value="Immediate">Immediate</option>
                      <option value="45 days">45 days</option>
                      <option value="180 days">180 days</option>
                      <option value="Planning phase">Planning phase</option>
                    </select>
                    <p id="timeline-helper" className="mt-1 text-xs text-gray-500">
                      When do you plan to start your exchange?
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="property" className="mb-2 block text-sm font-medium text-gray-900">
                      Property Being Sold
                    </label>
                    <input
                      id="property"
                      type="text"
                      value={formData.property}
                      onChange={handleChange("property")}
                      aria-describedby="property-helper"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    />
                    <p id="property-helper" className="mt-1 text-xs text-gray-500">
                      Include property type, location, and estimated value (optional)
                    </p>
                  </div>
                  <div>
                    <label htmlFor="estimatedCloseDate" className="mb-2 block text-sm font-medium text-gray-900">
                      Estimated Close Date
                    </label>
                    <input
                      id="estimatedCloseDate"
                      type="date"
                      value={formData.estimatedCloseDate}
                      onChange={handleChange("estimatedCloseDate")}
                      aria-describedby="date-helper"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                    />
                    <p id="date-helper" className="mt-1 text-xs text-gray-500">
                      Determines your 45 day and 180 day milestones (optional)
                    </p>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange("message")}
                    aria-describedby="message-helper"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#B68F40]"
                  />
                  <p id="message-helper" className="mt-1 text-xs text-gray-500">
                    Outline goals, replacement preferences, or coordination needs (optional)
                  </p>
                </div>

                {/* Turnstile Container */}
                {siteKey && (
                  <div className="flex justify-center">
                    <div ref={captchaRef} className="min-h-[78px]" />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting" || !!(siteKey && !turnstileReady)}
                  className="w-full rounded-full bg-[#B68F40] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#8A6B2F] focus:outline-none focus:ring-2 focus:ring-[#B68F40] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Submitting..." : "Submit Consultation Request"}
                </button>
                <p className="text-xs text-gray-500">Educational content only. Not tax or legal advice.</p>
                {feedback && (
                  <p role="status" aria-live="polite" className={`text-sm font-medium ${status === "success" ? "text-green-700" : "text-red-600"}`}>
                    {feedback}
                  </p>
                )}
              </fieldset>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Office Info */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              <h3 className="mb-6 font-serif text-xl font-bold text-[#14213D]">
                {PRIMARY_CITY} Office
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 text-[#B68F40] mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">1031 Exchange {PRIMARY_CITY}</p>
                    <p>{OFFICE_ADDRESS}</p>
                    <p>{OFFICE_CITY_STATE_ZIP}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-[#B68F40] flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <a href={`tel:${PHONE_E164}`} className="hover:text-[#14213D] font-medium">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-[#B68F40] flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#14213D] font-medium">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-5 w-5 text-[#B68F40] mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">Hours</p>
                    <p>Monday - Friday: 8:30 AM - 6:00 PM ET</p>
                    <p>24/7 emergency support available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              <h3 className="mb-4 font-serif text-xl font-bold text-[#14213D]">
                Our Location
              </h3>
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS_FULL)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`1031 Exchange ${PRIMARY_CITY} Office Location`}
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              <h3 className="mb-6 font-serif text-xl font-bold text-[#14213D]">
                Quick Links
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                <Link href="/services" className="text-[#14213D] hover:text-[#B68F40] transition-colors">
                  View All Services
                </Link>
                <Link href="/locations" className="text-[#14213D] hover:text-[#B68F40] transition-colors">
                  Explore Locations
                </Link>
                <Link href="/about" className="text-[#14213D] hover:text-[#B68F40] transition-colors">
                  About Our Process
                </Link>
                <Link href="/blog" className="text-[#14213D] hover:text-[#B68F40] transition-colors">
                  1031 Exchange Blog
                </Link>
                <Link href="/tools" className="text-[#14213D] hover:text-[#B68F40] transition-colors">
                  Exchange Tools
                </Link>
                <Link href="/property-types" className="text-[#14213D] hover:text-[#B68F40] transition-colors">
                  Property Types
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-[#F4F3EE]">
      <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-12">Loading...</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
