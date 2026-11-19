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
  fullName: "", mobile: "+91 ", email: "", interest: "Prenatal Yoga", pregnancyWeeks: "", question: "", contactConsent: false,
};

export function validateEnquiry(data: EnquiryData): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (data.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  const phone = data.mobile.replace(/[\s().-]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) errors.mobile = "Enter a valid number with country code, for example +91 98765 43210.";
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (!interests.includes(data.interest as Interest)) errors.interest = "Please choose what you are interested in.";
  if (data.pregnancyWeeks.trim() && !/^[1-9]\d?$/.test(data.pregnancyWeeks.trim())) errors.pregnancyWeeks = "Please enter the number of weeks as a positive whole number.";
  if (!data.contactConsent) errors.contactConsent = "Please allow us to contact you about this enquiry.";
  if (data.question.length > 600) errors.question = "Please keep your question within 600 characters.";
  return errors;
}

export type EnquiryContext = { placement: "hero" | "final"; consentVersion: "2026-11-19"; classFormat: "Online"; programme: "Regular Prenatal Yoga" };
export type EnquirySubmitHandler = (data: Readonly<EnquiryData>, context: EnquiryContext) => Promise<void>;

export class EnquiryUnavailableError extends Error {}
// No service adapter is configured in this project. Do not claim receipt or
// transmit personal/pregnancy details to an unapproved destination. The adapter
// must resolve only after a real acceptance response; the exact PDF success copy
// is already wired to that success path.
export const submitEnquiry: EnquirySubmitHandler = async () => {
  throw new EnquiryUnavailableError("Enquiries cannot be sent through this form at the moment. Please contact our team by phone or WhatsApp.");
};
