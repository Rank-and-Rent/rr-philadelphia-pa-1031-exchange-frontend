"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { services } from "../../lib/data/services";
import { PHONE_DISPLAY, CONTACT_EMAIL } from "../../lib/config/site";
import { isTurnstileEnabled, TURNSTILE_SITE_KEY } from "../../lib/turnstile";

const serviceNames = services.map((service) => service.name);

export function ContactForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    timeline: "",
    details: "",
  });

  const projectPrefill = useMemo(() => searchParams.get("projectType") || "", [searchParams]);

  useEffect(() => {
    if (projectPrefill) {
      setFormData((prev) => ({ ...prev, projectType: projectPrefill }));
      setTimeout(() => {
        const element = document.getElementById("contact-form");
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [projectPrefill]);

  const updateField = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email.";
    if (!formData.phone.trim()) errors.phone = "Phone is required.";
    if (!formData.projectType.trim()) errors.projectType = "Project type is required.";
    if (!formData.timeline.trim()) errors.timeline = "Timeline is required.";
    if (!formData.details.trim() || formData.details.trim().length < 40) errors.details = "Provide at least 40 characters of detail.";
    return errors;
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isTurnstileEnabled()) {
      setTurnstileLoaded(true);
      return;
    }

    const checkTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile && turnstileRef.current) {
        try {
          const widgetId = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: () => {},
            "error-callback": () => {
              setStatus("Captcha verification failed. Please try again.");
            },
          });
          turnstileWidgetIdRef.current = widgetId;
          setTurnstileLoaded(true);
        } catch (error) {
          console.error("Turnstile render error:", error);
        }
      }
    };

    if (typeof window !== "undefined" && window.turnstile) {
      checkTurnstile();
    } else {
      const interval = setInterval(() => {
        if (typeof window !== "undefined" && window.turnstile) {
          clearInterval(interval);
          checkTurnstile();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("Please resolve the highlighted fields before submitting.");
      return;
    }

    if (isTurnstileEnabled() && (!turnstileLoaded || !turnstileWidgetIdRef.current)) {
      setStatus("Please wait for security verification to load.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("projectType", formData.projectType);
      formDataToSend.append("timeline", formData.timeline);
      formDataToSend.append("details", formData.details);

      if (isTurnstileEnabled() && turnstileWidgetIdRef.current && window.turnstile) {
        const token = window.turnstile.getResponse(turnstileWidgetIdRef.current);
        if (!token) {
          setStatus("Please complete the security verification.");
          setIsSubmitting(false);
          return;
        }
        formDataToSend.append("cf-turnstile-response", token);
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed.");
      }

      setStatus("Thank you. A Philadelphia exchange advisor will respond shortly.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        timeline: "",
        details: "",
      });
      formRef.current?.reset();

      if (isTurnstileEnabled() && turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not submit your request. Please try again.");
      if (isTurnstileEnabled() && turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="contact-form"
      ref={formRef}
      className="space-y-6 rounded-3xl border border-outline/15 bg-white p-8 shadow-xl"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col text-sm font-semibold text-heading">
          Name
          <input
            type="text"
            value={formData.name}
            onChange={updateField("name")}
            className={`mt-2 rounded-xl border px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.name ? "border-red-400" : "border-outline/20"
            }`}
            placeholder="Full name"
          />
          {errors.name ? <span className="mt-2 text-xs text-red-500">{errors.name}</span> : null}
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading">
          Company
          <input
            type="text"
            value={formData.company}
            onChange={updateField("company")}
            className="mt-2 rounded-xl border border-outline/20 px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Entity or advisory firm"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading">
          Email
          <input
            type="email"
            value={formData.email}
            onChange={updateField("email")}
            className={`mt-2 rounded-xl border px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.email ? "border-red-400" : "border-outline/20"
            }`}
            placeholder="name@example.com"
          />
          {errors.email ? <span className="mt-2 text-xs text-red-500">{errors.email}</span> : null}
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading">
          Phone
          <input
            type="tel"
            value={formData.phone}
            onChange={updateField("phone")}
            className={`mt-2 rounded-xl border px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.phone ? "border-red-400" : "border-outline/20"
            }`}
            placeholder="(###) ###-####"
          />
          {errors.phone ? <span className="mt-2 text-xs text-red-500">{errors.phone}</span> : null}
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading">
          Project type
          <input
            list="project-types"
            value={formData.projectType}
            onChange={updateField("projectType")}
            className={`mt-2 rounded-xl border px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.projectType ? "border-red-400" : "border-outline/20"
            }`}
            placeholder="Replacement property focus"
          />
          <datalist id="project-types">
            {serviceNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          {errors.projectType ? <span className="mt-2 text-xs text-red-500">{errors.projectType}</span> : null}
        </label>
        <label className="flex flex-col text-sm font-semibold text-heading">
          Target timeline
          <input
            type="text"
            value={formData.timeline}
            onChange={updateField("timeline")}
            className={`mt-2 rounded-xl border px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.timeline ? "border-red-400" : "border-outline/20"
            }`}
            placeholder="Example: Identification underway, closing in 120 days"
          />
          {errors.timeline ? <span className="mt-2 text-xs text-red-500">{errors.timeline}</span> : null}
        </label>
      </div>
      <label className="flex flex-col text-sm font-semibold text-heading">
        Project details
        <textarea
          value={formData.details}
          onChange={updateField("details")}
          rows={6}
          className={`mt-2 rounded-xl border px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            errors.details ? "border-red-400" : "border-outline/20"
          }`}
          placeholder="Outline property types, exchange status, stakeholders, financing details, and deadlines."
        />
        {errors.details ? <span className="mt-2 text-xs text-red-500">{errors.details}</span> : null}
      </label>
      {isTurnstileEnabled() && (
        <div className="flex justify-center">
          <div ref={turnstileRef} />
        </div>
      )}
      <div className="flex flex-col gap-3 text-sm text-[#3F3F3F] md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f1c33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit request"}
        </button>
        <p className="text-xs text-[#6B6B6B]">
          Educational content only. Not tax or legal advice. You may also reach us at {PHONE_DISPLAY} or {CONTACT_EMAIL}.
        </p>
      </div>
      {status ? (
        <p className={`text-sm font-semibold ${status.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
          {status}
        </p>
      ) : null}
      {isTurnstileEnabled() && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
            onLoad={() => {
              if (typeof window !== "undefined" && window.turnstile && turnstileRef.current && !turnstileWidgetIdRef.current) {
                try {
                  const widgetId = window.turnstile.render(turnstileRef.current, {
                    sitekey: TURNSTILE_SITE_KEY,
                    callback: () => {},
                    "error-callback": () => {
                      setStatus("Captcha verification failed. Please try again.");
                    },
                  });
                  turnstileWidgetIdRef.current = widgetId;
                  setTurnstileLoaded(true);
                } catch (error) {
                  console.error("Turnstile render error:", error);
                }
              }
            }}
          />
        </>
      )}
    </form>
  );
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement | null, options: { sitekey: string; callback?: () => void; "error-callback"?: () => void }) => string;
      getResponse: (widgetId: string) => string | undefined;
      reset: (widgetId: string) => void;
    };
  }
}

