import {
  SITE_NAME,
  PHONE_DISPLAY,
  PHONE_E164,
  CONTACT_EMAIL,
  SITE_URL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
} from "./config/site";

export function getBrand() {
  const COLORS = {
    primary: "#14213D",
    secondary: "#B68F40",
    dark: "#0B0F13",
  };

  return {
    subject: "We received your 1031 exchange inquiry",
    preheader:
      "Thanks for your inquiry, we have received your 1031 exchange request and will contact you within one business day.",
    company_name: SITE_NAME,
    logo_url: `${SITE_URL}/logo.png`,
    city_state: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    brand_accent: COLORS.primary,
    cta_dark_bg: COLORS.dark,
    bg_color: "#0B0F13",
    text_dark: "#0B0F13",
    text_muted: "#666666",
    text_body: "#333333",
    text_faint: "#999999",
    border_color: "#E5E5E5",
    card_header_bg: "#F5F5F5",
    hero_title: "Thanks for your inquiry. We received your 1031 exchange request.",
    hero_subtitle:
      "Our team will review your details and reach out within one business day to discuss your exchange strategy.",
    details_title: "Your project details",
    call_cta_label: "Call Now",
    call_phone: PHONE_DISPLAY,
    call_phone_plain: PHONE_E164.replace(/\D/g, ""),
    site_cta_label: "Go To Site",
    site_url: SITE_URL,
    address_line: "Serving clients across Pennsylvania.",
    footer_note: "This confirmation is a transactional email related to your request.",
    brand_title: SITE_NAME,
    brand_tagline: "1031 Exchange Property Identification and Coordination Services",
    brand_dark_bg: COLORS.dark,
    brand_gold: COLORS.secondary,
    supportPhone: PHONE_DISPLAY,
    supportEmail: CONTACT_EMAIL,
    service_area: `Serving ${PRIMARY_CITY} and ${PRIMARY_STATE_ABBR}`,
    portfolio_url: SITE_URL,
    portfolio_blurb: `1031 exchange property identification and coordination services for ${PRIMARY_CITY} investors.`,
    intro_copy:
      "Delivering expert 1031 exchange property identification and coordination services to help investors defer capital gains taxes through like-kind property exchanges.",
  };
}

