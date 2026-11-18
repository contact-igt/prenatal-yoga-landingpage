export const interests = ["Prenatal Yoga", "Conscious Pregnancy updates", "Both"] as const;
export type Interest = (typeof interests)[number];
export type EnquiryData = {
  fullName: string;
  mobile: string;
  email: string;
  interest: Interest | "";
  question: string;
  contactConsent: boolean;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryData, string>>;
export const emptyEnquiry: EnquiryData = {
  fullName: "", mobile: "+91 ", email: "", interest: "", question: "", contactConsent: false,
};

export function validateEnquiry(data: EnquiryData): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (data.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  const phone = data.mobile.replace(/[\s().-]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) errors.mobile = "Enter a valid number with country code, for example +91 98765 43210.";
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Please enter a valid email address.";
  if (!interests.includes(data.interest as Interest)) errors.interest = "Please choose what you are interested in.";
  if (!data.contactConsent) errors.contactConsent = "Please allow us to contact you about this enquiry.";
  if (data.question.length > 600) errors.question = "Please keep your question within 600 characters.";
  return errors;
}

export type EnquiryContext = { placement: "hero" | "final"; consentVersion: "2026-11-18" };
export type EnquirySubmitHandler = (data: Readonly<EnquiryData>, context: EnquiryContext) => Promise<void>;

// Integration seam. Intentionally no network, storage, cookies, logs or analytics.
// Future integration must only resolve after its actual success response.
export const submitEnquiry: EnquirySubmitHandler = async () => {};
