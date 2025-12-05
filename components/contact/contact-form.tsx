"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { services } from "../../lib/data/services";
import { PHONE_DISPLAY, CONTACT_EMAIL } from "../../lib/config/site";
import { isTurnstileEnabled, TURNSTILE_SITE_KEY } from "../../lib/turnstile";

const serviceNames = services.map((service) => service.name).sort((a, b) => a.localeCompare(b));

type ContactFormProps = {
  variant?: "default" | "dark";
};

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    property: "",
    estimatedCloseDate: "",
    city: "",
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

      if (isTurnstileEnabled() && turnstileWidgetIdRef.current && window.turnstile && window.turnstile.getResponse) {
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
        property: "",
        estimatedCloseDate: "",
        city: "",
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

  const isDark = variant === "dark";
  const formClassName = isDark
    ? "space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur"
    : "space-y-6 rounded-3xl border border-outline/15 bg-white p-8 shadow-xl";
  const labelClassName = isDark
    ? "flex flex-col text-sm font-semibold text-white"
    : "flex flex-col text-sm font-semibold text-heading";
  const inputClassName = (hasError: boolean) =>
    isDark
      ? `mt-2 rounded-xl border px-3 py-2 text-sm text-white outline-none transition focus:border-[#B68F40] focus:ring-2 focus:ring-[#B68F40]/20 ${
          hasError ? "border-red-400 bg-white/10" : "border-white/20 bg-white/10"
        }`
      : `mt-2 rounded-xl border px-3 py-2 text-sm text-[#1B1B1B] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
          hasError ? "border-red-400" : "border-outline/20"
        }`;
  const errorClassName = isDark ? "mt-2 text-xs text-red-300" : "mt-2 text-xs text-red-500";
  const statusClassName = (isSuccess: boolean) =>
    isDark
      ? `text-sm font-semibold ${isSuccess ? "text-green-300" : "text-red-300"}`
      : `text-sm font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`;

  return (
    <form
      id="contact-form"
      ref={formRef}
      className={formClassName}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClassName}>
          Name
          <input
            type="text"
            value={formData.name}
            onChange={updateField("name")}
            className={inputClassName(!!errors.name)}
            placeholder="Full name"
          />
          {errors.name ? <span className={errorClassName}>{errors.name}</span> : null}
        </label>
        <label className={labelClassName}>
          Company
          <input
            type="text"
            value={formData.company}
            onChange={updateField("company")}
            className={inputClassName(false)}
            placeholder="Entity or advisory firm"
          />
        </label>
        <label className={labelClassName}>
          Email
          <input
            type="email"
            value={formData.email}
            onChange={updateField("email")}
            className={inputClassName(!!errors.email)}
            placeholder="name@example.com"
          />
          {errors.email ? <span className={errorClassName}>{errors.email}</span> : null}
        </label>
        <label className={labelClassName}>
          Phone
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              // Only allow numbers, spaces, parentheses, hyphens, and plus sign
              const value = e.target.value.replace(/[^\d\s()\-+]/g, "");
              setFormData((prev) => ({ ...prev, phone: value }));
            }}
            className={inputClassName(!!errors.phone)}
            placeholder="(###) ###-####"
          />
          {errors.phone ? <span className={errorClassName}>{errors.phone}</span> : null}
        </label>
        <label className={labelClassName}>
          Project type
          <input
            list="project-types"
            value={formData.projectType}
            onChange={updateField("projectType")}
            className={inputClassName(!!errors.projectType)}
            placeholder="Replacement property focus"
          />
          <datalist id="project-types">
            {serviceNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          {errors.projectType ? <span className={errorClassName}>{errors.projectType}</span> : null}
        </label>
        <label className={labelClassName}>
          Property Being Sold
          <input
            type="text"
            value={formData.property}
            onChange={updateField("property")}
            placeholder="Include property type, location, and estimated value (optional)"
            className={inputClassName(false)}
          />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className={labelClassName}>
            Estimated Close Date
            <input
              type="date"
              value={formData.estimatedCloseDate}
              onChange={updateField("estimatedCloseDate")}
              className={inputClassName(false)}
            />
          </label>
          <label className={labelClassName}>
            City
            <input
              type="text"
              value={formData.city}
              onChange={updateField("city")}
              placeholder="Primary metro or submarket (optional)"
              className={inputClassName(false)}
            />
          </label>
        </div>
        <label className={labelClassName}>
          Target timeline
          <input
            type="text"
            value={formData.timeline}
            onChange={updateField("timeline")}
            className={inputClassName(!!errors.timeline)}
            placeholder="Example: Identification underway, closing in 120 days"
          />
          {errors.timeline ? <span className={errorClassName}>{errors.timeline}</span> : null}
        </label>
      </div>
      <label className={labelClassName}>
        Project details
        <textarea
          value={formData.details}
          onChange={updateField("details")}
          rows={6}
          className={inputClassName(!!errors.details)}
          placeholder="Outline property types, exchange status, stakeholders, financing details, and deadlines."
        />
        {errors.details ? <span className={errorClassName}>{errors.details}</span> : null}
      </label>
      {isTurnstileEnabled() && (
        <div className="flex justify-center">
          <div ref={turnstileRef} />
        </div>
      )}
      <div className={`flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between ${isDark ? "text-[#E8E9ED]" : "text-[#3F3F3F]"}`}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex rounded-full px-6 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed ${
            isDark
              ? "bg-[#B68F40] text-[#F9F9F8] hover:bg-[#8A6F2F] focus-visible:outline-[#F9F9F8]"
              : "bg-primary text-white hover:bg-[#0f1c33] focus-visible:outline-primary"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit request"}
        </button>
        <p className={isDark ? "text-xs text-[#E8E9ED]" : "text-xs text-[#6B6B6B]"}>
          Educational content only. Not tax or legal advice. You may also reach us at {PHONE_DISPLAY} or {CONTACT_EMAIL}.
        </p>
      </div>
      {status ? <p className={statusClassName(status.includes("Thank you"))}>{status}</p> : null}
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


