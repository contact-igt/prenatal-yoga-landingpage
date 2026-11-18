"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { privacyMessage, site } from "@/config/site";
import { emptyEnquiry, interests, submitEnquiry, validateEnquiry, type EnquiryData, type EnquiryErrors, type Interest } from "@/lib/enquiry";

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

  useEffect(() => {
    const select = (event: Event) => {
      const detail = (event as CustomEvent<{ target: string; interest?: Interest }>).detail;
      if (detail.target === placement && detail.interest) {
        setData((current) => ({ ...current, interest: detail.interest! }));
        setErrors((current) => ({ ...current, interest: undefined }));
      }
    };
    document.addEventListener("birthwave:enquire", select);
    return () => document.removeEventListener("birthwave:enquire", select);
  }, [placement]);

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
      await submitEnquiry({ ...data, fullName: data.fullName.trim(), mobile: data.mobile.trim(), email: data.email.trim(), question: data.question.trim() }, { placement, consentVersion: "2026-11-18" });
      setData({ ...emptyEnquiry });
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.current?.showModal();
    } catch {
      setSubmissionError("Something went wrong. Please try again or contact our team by phone.");
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
      <div className="form-intro"><span className="eyebrow">LET’S FIND YOUR NEXT STEP</span><h2 id={id("title")}>A little support starts here.</h2><p>Tell us what you’re looking for.</p></div>
      <form ref={form} onSubmit={handleSubmit} noValidate aria-labelledby={id("title")}>
        <p className="required-note">* Required fields</p>
        <div className="form-grid">
          <div className="field field-wide"><label htmlFor={id("fullName")}>Name <span aria-hidden="true">*</span></label>
            <input id={id("fullName")} name="fullName" autoComplete="name" required maxLength={100} value={data.fullName} onChange={(event) => update("fullName", event.target.value)} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? id("fullName-error") : undefined} />{fieldError("fullName")}</div>
          <div className="field"><label htmlFor={id("mobile")}>Phone number <span aria-hidden="true">*</span></label>
            <input id={id("mobile")} name="mobile" type="tel" inputMode="tel" autoComplete="tel" required maxLength={24} value={data.mobile} onChange={(event) => update("mobile", event.target.value)} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? id("mobile-error") : undefined} />{fieldError("mobile")}</div>
          <div className="field"><label htmlFor={id("email")}>Email <span className="optional">(optional)</span></label>
            <input id={id("email")} name="email" type="email" autoComplete="email" maxLength={254} value={data.email} onChange={(event) => update("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email-error") : undefined} />{fieldError("email")}</div>
          <div className="field field-wide"><label htmlFor={id("interest")}>Interested in <span aria-hidden="true">*</span></label>
            <select id={id("interest")} name="interest" required value={data.interest} onChange={(event) => update("interest", event.target.value as Interest | "")} aria-invalid={!!errors.interest} aria-describedby={errors.interest ? id("interest-error") : undefined}>
              <option value="">Select your interest</option>{interests.map(interest => <option key={interest} value={interest}>{interest}</option>)}
            </select>{fieldError("interest")}</div>
          <div className="field field-wide"><label htmlFor={id("question")}>Message<span className="optional"> (optional)</span></label>
            <textarea id={id("question")} name="question" rows={2} maxLength={600} value={data.question} onChange={(event) => update("question", event.target.value)} aria-invalid={!!errors.question} aria-describedby={`${id("question-guidance")}${errors.question ? ` ${id("question-error")}` : ""}`} title={privacyMessage} /><span className="sr-only" id={id("question-guidance")}>{privacyMessage}</span>{fieldError("question")}</div>
        </div>
        <div className="consents">
          <label className="checkbox-label" htmlFor={id("contactConsent")}><input id={id("contactConsent")} name="contactConsent" type="checkbox" required checked={data.contactConsent} onChange={(event) => update("contactConsent", event.target.checked)} aria-invalid={!!errors.contactConsent} aria-describedby={errors.contactConsent ? id("contactConsent-error") : undefined} /><span>I agree to be contacted by The BirthWave about this enquiry and have read the <a href={site.privacy} target="_blank" rel="noreferrer">Privacy Policy</a>. <span aria-hidden="true">*</span></span></label>
          {fieldError("contactConsent")}
        </div>
        {submissionError && <p className="field-error" role="alert">{submissionError}</p>}
        <button ref={submitButton} type="submit" disabled={!hydrated || busy} className="button submit-button" aria-busy={busy}><span>{busy ? "Please wait…" : "Request Details"}</span><ArrowUpRight size={18} aria-hidden="true" /></button>
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
      <h2 id={id("thanks-title")}>Thank you for your interest!</h2>
      <p id={id("thanks-description")}>Thank you for taking the first step towards a more connected pregnancy journey with The BirthWave.</p>
      <button autoFocus className="button" onClick={() => dialog.current?.close()}>Done</button>
    </dialog>
  </>;
}
