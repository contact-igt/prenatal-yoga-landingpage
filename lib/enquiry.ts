export const interests = ["Prenatal Yoga", "Conscious Pregnancy updates", "Both"] as const;
export type Interest = (typeof interests)[number];
export type EnquiryData = {
  fullName: string;
  mobile: string;
  email: string;
  interest: Interest | "";
  pregnancyWeeks: string;
  question: string;
  contactConsent: boolean;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryData, string>>;
export const emptyEnquiry: EnquiryData = {
  fullName: "", mobile: "", email: "", interest: "Prenatal Yoga", pregnancyWeeks: "", question: "", contactConsent: false,
};

export function sanitizeFullName(value: string) {
  return value.replace(/[^A-Za-z\s'-]/g, "").replace(/^[\s'-]+/g, "").slice(0, 100);
}

export function sanitizeMobile(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function sanitizeEmail(value: string) {
  return value.replace(/\s/g, "").slice(0, 254);
}

export function validateEnquiry(data: EnquiryData): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const fullName = data.fullName.trim();
  if (fullName.length < 2) errors.fullName = "Please enter your full name.";
  else if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(fullName)) errors.fullName = "Name can contain letters, spaces, apostrophes or hyphens only.";
  if (!/^[6-9]\d{9}$/.test(data.mobile)) errors.mobile = "Enter a valid 10-digit mobile number.";
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (!interests.includes(data.interest as Interest)) errors.interest = "Please choose what you are interested in.";
  if (data.pregnancyWeeks.trim() && !/^[1-9]\d?$/.test(data.pregnancyWeeks.trim())) errors.pregnancyWeeks = "Please enter the number of weeks as a positive whole number.";
  if (!data.contactConsent) errors.contactConsent = "Please allow us to contact you about this enquiry.";
  if (data.question.length > 600) errors.question = "Please keep your question within 600 characters.";
  return errors;
}

export type EnquiryContext = { placement: "hero" | "final"; consentVersion: "2026-11-19"; classFormat: "Online"; programme: "Regular Prenatal Yoga" };
export type EnquirySubmitHandler = (data: Readonly<EnquiryData>, context: EnquiryContext) => Promise<void>;

export class EnquiryUnavailableError extends Error {}
export const submitEnquiry: EnquirySubmitHandler = async (data, context) => {
  void context;
  const submissionId = crypto.randomUUID();
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      submissionId,
      interest: data.interest || "Prenatal Yoga",
    }),
  });

  const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !result?.ok) {
    throw new EnquiryUnavailableError(result?.error || "We could not send your enquiry. Please try again or contact our team by phone.");
  }
};
