"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { privacyMessage, site } from "@/config/site";
import { emptyEnquiry, EnquiryUnavailableError, sanitizeEmail, sanitizeFullName, sanitizeMobile, submitEnquiry, validateEnquiry, type EnquiryData, type EnquiryErrors } from "@/lib/enquiry";
import { onlineCopy } from "@/config/online-content";

const copy = onlineCopy.enquiry;

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function EnquiryForm({ placement }: { placement: "hero" | "final" }) {
  // A disabled SSR submit button prevents a native GET of personal details if JS fails.
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const [data, setData] = useState<EnquiryData>({ ...emptyEnquiry });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [busy, setBusy] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const pending = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const id = (field: string) => `${placement}-${field}`;

  function update<K extends keyof EnquiryData>(key: K, value: EnquiryData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const nextErrors = validateEnquiry(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      (form.current?.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    pending.current = true;
    setBusy(true);
    setSubmissionError("");
    try {
      await submitEnquiry({ ...data, fullName: data.fullName.trim(), mobile: data.mobile.trim(), email: data.email.trim(), pregnancyWeeks: data.pregnancyWeeks.trim(), question: data.question.trim() }, { placement, consentVersion: "2026-11-19", classFormat: "Online", programme: "Regular Prenatal Yoga" });
      setData({ ...emptyEnquiry });
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.current?.showModal();
    } catch (error) {
      setSubmissionError(error instanceof EnquiryUnavailableError ? error.message : "Something went wrong. Please try again or contact our team by phone.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  function fieldError(key: keyof EnquiryData) {
    return errors[key] ? <span id={id(`${key}-error`)} className="field-error" role="alert">{errors[key]}</span> : null;
  }
  return <>
    <div className="enquiry-card" id={`${placement}-enquiry`}>
      <div className="form-intro"><span className="eyebrow">{copy.eyebrow}</span><h2 id={id("title")}>{copy.title}</h2></div>
      <form ref={form} onSubmit={handleSubmit} noValidate aria-labelledby={id("title")}>
        <p className="required-note">* Required fields</p>
        <div className="form-grid">
          <div className="field field-wide"><label htmlFor={id("fullName")}>Full Name <span aria-hidden="true">*</span></label>
            <input id={id("fullName")} name="fullName" placeholder="Enter your full name" autoComplete="name" required maxLength={100} value={data.fullName} onChange={(event) => update("fullName", sanitizeFullName(event.target.value))} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? id("fullName-error") : undefined} />{fieldError("fullName")}</div>
          <div className="field"><label htmlFor={id("mobile")}>Phone Number <span aria-hidden="true">*</span></label>
            <input id={id("mobile")} name="mobile" placeholder="9876543210" type="tel" inputMode="numeric" autoComplete="tel" required maxLength={10} pattern="[6-9][0-9]{9}" value={data.mobile} onChange={(event) => update("mobile", sanitizeMobile(event.target.value))} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? id("mobile-error") : undefined} />{fieldError("mobile")}</div>
          <div className="field"><label htmlFor={id("email")}>Email Address <span className="optional">(Optional)</span></label>
            <input id={id("email")} name="email" placeholder="Enter your email address" type="email" autoComplete="email" maxLength={254} value={data.email} onChange={(event) => update("email", sanitizeEmail(event.target.value))} aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email-error") : undefined} />{fieldError("email")}</div>
          <div className="field field-wide"><label htmlFor={id("pregnancyWeeks")}>How many weeks pregnant are you? <span className="optional">(Optional)</span></label>
            <input id={id("pregnancyWeeks")} name="pregnancyWeeks" placeholder="Enter the number of weeks" type="number" inputMode="numeric" min={1} step={1} value={data.pregnancyWeeks} onChange={(event) => update("pregnancyWeeks", event.target.value)} aria-invalid={!!errors.pregnancyWeeks} aria-describedby={errors.pregnancyWeeks ? id("pregnancyWeeks-error") : undefined} />{fieldError("pregnancyWeeks")}</div>
          <div className="field field-wide"><label htmlFor={id("question")}>Do you have a question for us? <span className="optional">(Optional)</span></label>
            <textarea id={id("question")} name="question" placeholder="Tell us what you'd like to know about the online classes." rows={2} maxLength={600} value={data.question} onChange={(event) => update("question", event.target.value)} aria-invalid={!!errors.question} aria-describedby={`${id("question-guidance")}${errors.question ? ` ${id("question-error")}` : ""}`} title={privacyMessage} /><span className="sr-only" id={id("question-guidance")}>{privacyMessage}</span>{fieldError("question")}</div>
        </div>
        <div className="consents">
          <label className="checkbox-label" htmlFor={id("contactConsent")}><input id={id("contactConsent")} name="contactConsent" type="checkbox" required checked={data.contactConsent} onChange={(event) => update("contactConsent", event.target.checked)} aria-invalid={!!errors.contactConsent} aria-describedby={errors.contactConsent ? id("contactConsent-error") : undefined} /><span>{copy.consent} <a href={site.privacy} target="_blank" rel="noreferrer">Privacy Policy</a>. <span aria-hidden="true">*</span></span></label>
          {fieldError("contactConsent")}
        </div>
        {submissionError && <p className="field-error" role="alert">{submissionError}</p>}
        <button ref={submitButton} type="submit" disabled={!hydrated || busy} className="button submit-button" aria-busy={busy}><span>{busy ? "Please wait…" : copy.submit}</span><ArrowUpRight size={18} aria-hidden="true" /></button>
      </form>
    </div>
    <dialog ref={dialog} className="thank-you" aria-labelledby={id("thanks-title")} aria-describedby={id("thanks-description")}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}
      onClose={() => { document.body.style.overflow = previousOverflow.current; submitButton.current?.focus({ preventScroll: true }); }}
      onClick={(event) => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current.close(); } }}>
      <div className="thanks-icon"><Check size={30} aria-hidden="true" /></div>
      <h2 id={id("thanks-title")}>{copy.successTitle}</h2>
      <div id={id("thanks-description")}>{copy.successParagraphs.map(p => <p key={p}>{p}</p>)}</div>
      <button autoFocus className="button" onClick={() => dialog.current?.close()}>Done</button>
    </dialog>
  </>;
}
