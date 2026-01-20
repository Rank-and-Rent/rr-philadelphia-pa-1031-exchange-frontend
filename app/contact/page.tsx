"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { FormEvent } from "react";

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
      if (siteKey && (!turnstileReady || !window.turnstile || !turnstileId)) {
        setFeedback("Please complete the security verification.");
        setStatus("error");
        return;
      }

      let turnstileToken = '';
      if (siteKey && window.turnstile && turnstileId) {
        try {
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

      const phoneDigits = formData.phone.replace(/\D/g, '');

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
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
        setStatus("success");
        setFeedback("Thank you. A Philadelphia exchange specialist will follow up within one business day.");
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }));
        setFeedback(errorData.error || 'Failed to submit form. Please try again.');
        setStatus("error");
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFeedback("An error occurred. Please try again or contact us directly.");
      setStatus("error");
      if (window.turnstile && turnstileId) {
        window.turnstile.reset(turnstileId);
      }
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full border px-4 py-3 text-sm text-[#1B1B1B] outline-none transition focus:border-[#5D5838] focus:ring-0 ${
      hasError ? "border-red-400" : "border-[#5D5838]/20"
    }`;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#5D5838] py-20 text-white">
        <div className="container space-y-6">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Get in Touch</p>
            <h1 className="text-4xl font-normal tracking-wide sm:text-5xl">CONTACT 1031 EXCHANGE {PRIMARY_CITY.toUpperCase()}</h1>
            <p className="text-base leading-relaxed text-white/80">
              Ready to start your 1031 exchange? Our {PRIMARY_CITY} team specializes in connecting investors with compliant replacement properties across Pennsylvania.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div id="contact-form" className="border border-[#5D5838]/20 p-8">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Start Your Exchange</p>
              <h2 className="mt-3 text-2xl font-normal tracking-wide text-[#5D5838]">START YOUR EXCHANGE PLAN</h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <fieldset disabled={status === "submitting"} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange("name")}
                        className={inputClasses(!!errors.name)}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange("email")}
                        className={inputClasses(!!errors.email)}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        className={inputClasses(!!errors.phone)}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange("company")}
                        className={inputClasses(false)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-[#5D5838]">
                      Service <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange("projectType")}
                      className={inputClasses(!!errors.projectType)}
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
                    {errors.projectType && <p className="mt-1 text-xs text-red-600">{errors.projectType}</p>}
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange("city")}
                        placeholder="Primary metro or submarket"
                        className={inputClasses(false)}
                      />
                    </div>
                    <div>
                      <label htmlFor="timeline" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        value={formData.timeline}
                        onChange={handleChange("timeline")}
                        className={inputClasses(false)}
                      >
                        <option value="">Select timeline</option>
                        <option value="Immediate">Immediate</option>
                        <option value="45 days">45 days</option>
                        <option value="180 days">180 days</option>
                        <option value="Planning phase">Planning phase</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="property" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        Property Being Sold
                      </label>
                      <input
                        id="property"
                        type="text"
                        value={formData.property}
                        onChange={handleChange("property")}
                        placeholder="Type, location, value"
                        className={inputClasses(false)}
                      />
                    </div>
                    <div>
                      <label htmlFor="estimatedCloseDate" className="mb-2 block text-sm font-medium text-[#5D5838]">
                        Estimated Close Date
                      </label>
                      <input
                        id="estimatedCloseDate"
                        type="date"
                        value={formData.estimatedCloseDate}
                        onChange={handleChange("estimatedCloseDate")}
                        className={inputClasses(false)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#5D5838]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange("message")}
                      placeholder="Outline goals, replacement preferences, or coordination needs"
                      className={inputClasses(false)}
                    />
                  </div>

                  {siteKey && (
                    <div className="flex justify-center">
                      <div ref={captchaRef} className="min-h-[78px]" />
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={status === "submitting" || !!(siteKey && !turnstileReady)}
                    className="w-full bg-[#5D5838] px-8 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#454326] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Submitting..." : "Get Started Today"}
                  </button>
                  
                  <p className="text-xs text-[#6B6B6B]">Educational content only. Not tax or legal advice.</p>
                  
                  {feedback && (
                    <p className={`text-sm font-medium ${status === "success" ? "text-green-700" : "text-red-600"}`}>
                      {feedback}
                    </p>
                  )}
                </fieldset>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Office Info */}
              <div className="border border-[#5D5838]/20 p-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Office</p>
                <h3 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">{PRIMARY_CITY.toUpperCase()} OFFICE</h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-[#5D5838] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div className="text-sm text-[#3F3F3F]">
                      <p className="font-medium text-[#5D5838]">1031 Exchange {PRIMARY_CITY}</p>
                      <p>{OFFICE_ADDRESS}</p>
                      <p>{OFFICE_CITY_STATE_ZIP}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-[#5D5838] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href={`tel:${PHONE_E164}`} className="text-sm font-medium text-[#5D5838] hover:text-[#7A7654]">
                      {PHONE_DISPLAY}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-[#5D5838] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-medium text-[#5D5838] hover:text-[#7A7654]">
                      {CONTACT_EMAIL}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-[#5D5838] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-[#3F3F3F]">
                      <p className="font-medium text-[#5D5838]">Hours</p>
                      <p>Monday - Friday: 8:30 AM - 6:00 PM ET</p>
                      <p>24/7 emergency support available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="border border-[#5D5838]/20 p-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Location</p>
                <h3 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">OUR LOCATION</h3>
                <div className="mt-6 aspect-video w-full overflow-hidden">
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
              <div className="border border-[#5D5838]/20 p-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D5838]">Navigation</p>
                <h3 className="mt-3 text-xl font-normal tracking-wide text-[#5D5838]">QUICK LINKS</h3>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Link href="/services" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                    View All Services
                  </Link>
                  <Link href="/locations" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                    Explore Locations
                  </Link>
                  <Link href="/about" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                    About Our Process
                  </Link>
                  <Link href="/blog" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                    1031 Exchange Blog
                  </Link>
                  <Link href="/tools" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                    Exchange Tools
                  </Link>
                  <Link href="/property-types" className="text-sm text-[#5D5838] underline underline-offset-4 hover:text-[#7A7654]">
                    Property Types
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-12">Loading...</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
