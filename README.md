# BirthWave Prenatal Yoga and Conscious Pregnancy

A standalone Next.js App Router, React, TypeScript and Tailwind CSS landing page. All work is local; no deployment or remote push is configured. The final master-prompt overrides govern visible content and the frontend-only enquiry interaction.

## Local development

Use Node.js 22.13 or later and npm (Node.js 24 is used for this implementation). From `E:\prenatalyoga`:

```powershell
npm ci
npm run dev
```

Preview: http://127.0.0.1:3000

```powershell
npm run lint
npm run typecheck
npm run build
npm start
```

The production start command requires a successful build. Development uses port 3000 unless already occupied; check the server output for an alternative port. The lockfile pins the installed dependencies.

## Page and design

The root route contains exactly ten independent, vertically stacked main sections:

1. Hero with complete enquiry form on the right on desktop.
2. Two image-led offer panels.
3. Four benefits arranged around an arched photograph, with safety statement.
4. Prenatal yoga details and editable monthly fee.
5. Three-step enrolment journey.
6. Conscious Pregnancy feature with warm clay photographic treatment and five explicitly proposed activities.
7. Editorial doctor profile and BirthWave care approach.
8. Eight accessible FAQ accordions with complete answers.
9. Independent existing postpartum care bridge.
10. Final enquiry form, clinic details, phone and WhatsApp links.

Official clay `#CA9585` dominates the palette, with warm cream, blush, beige, brown and charcoal supporting tones. Sky Blue `#5DAEDB` and Soft Coral `#F88379` are retained as restrained brand tokens. Locally hosted Plus Jakarta Sans provides headings; Poppins supports navigation, forms and body text. Each section has its own composition without horizontal section separators. CSS handles hover and entrance transitions; one IntersectionObserver handles scroll reveals using the Web Animations API. Content is visible without motion or a working observer, and reduced-motion preferences disable animation.

The hero uses `pregnancy.webp` as a softly blended background within its left content area, with the existing introduction, location and boxed CTAs clear of the maternity artwork. On desktop its local photo mask ends at the form bottom, without changing the photograph's reference frame; the CTA row sits 24px higher and the form shifts right only where viewport space allows. There is no standalone image card. The compact shared form stays on the right. The group-session caption is retained beside the group photograph in the third getting-started card. Offer features and fee/status information remain intact. Benefits frame the clinic lounge image; the first getting-started image uses `consultation-notebook.webp`; FAQ retains `doctor-santoshi.webp`. The approach serves the exact full-resolution `EXP01338 (1) copy.webp` without another compression pass. Headings retain one consistent colour within each heading.

Conscious Pregnancy retains its blurred photograph and open heading/description, with a separate duration/format/pricing panel. Five individual cards reveal complete descriptions on hover, keyboard focus or tap. Care Beyond Pregnancy uses a clean cream background and the same pelvic-health photograph as `card (1).webp`, recovered from its high-resolution original, beside the smaller consultation/newborn photographs. Both uses of `postpartum-consultation.webp` have an upward-adjusted crop to show the doctor and both patients. The final section retains the compact form on the left over the original lounge photograph with its dark brown overlay; existing heading, description, location and contact actions sit on the right. The footer is unchanged.

The current revision adds a fixed five-action toolbar (WhatsApp, phone, Instagram, appointment and YouTube) using the official destinations verified on the BirthWave contact page. The landing page now uses “Program” consistently, and the hero, postpartum, FAQ and BirthWave Approach conversion actions all use the shared button system. The campaign phone remains +91 93630 31925 and WhatsApp remains +91 79042 51378; the official contact page also lists +91 98407 98472 as a separate CUG number, which was not substituted into the campaign CTA.

## Source and component map

The decorative wave surface uses `soft-peach-waves.png`, soft `#EAD5CD`, faded `#F6EDE8` and a restrained `#CA9585` accent on a warm cream base. Hero, Guided Practice, Conscious Pregnancy and the final consultation section use their own photographic treatments without generic wave overlays. Independent sections retain approved clean, straight boundaries; there are no transition masks or horizontal gradient strips. Internal photographic blending remains. Guided Practice keeps its original seated-yoga photograph, corrected description width and pricing panel.

- `app/page.tsx`: server-rendered ten-section composition, header and footer.
- `app/layout.tsx`: local font loading, metadata, configurable canonical, non-indexable review defaults.
- `app/globals.css`: Tailwind import, design tokens, responsive layouts and motion.
- `components/header.tsx`: compact desktop header and accessible mobile navigation.
- `components/enquiry-form.tsx`: shared form, field errors, consent and native modal.
- `components/faq.tsx`: accessible accordion.
- `components/programme-activities.tsx`: hover, keyboard and touch disclosures for proposed activities.
- `components/ui/enquiry-link.tsx`: CTA scrolling, focus and programme preselection.
- `components/ui/reveal.tsx`: shared lightweight scroll animation observer.
- `config/content.ts`: complete client content, benefits, steps, proposed activities and FAQs.
- `config/site.ts`: editable contact details, destinations, pricing, operational copy, SEO configuration and privacy message.
- `lib/enquiry.ts`: typed payload, options, validation and isolated submission seam.
- `public/brand`, `public/fonts`, `public/images`: local brand assets and optimized photographic derivatives.
- `scripts/prepare-assets.py`: reproducible image derivatives from untouched sources.
- `scripts/fetch-assets.py`, `scripts/fetch-fonts.py`: reference acquisition helpers, never used by the website at runtime.

## Photography and brand provenance

All 45 supplied WebPs were inspected visually using contact sheets. All 19 brand-guide pages were rendered and reviewed. The original ZIP and source documents remain unchanged. Extracted originals and temporary inspection material are kept in the ignored `reference/` folder; only selected optimized assets are served publicly.

| Output image | Supplied original | Use |
| --- | --- | --- |
| `d056632c-5977-49a3-97ed-7995e66680f7-clean.webp` | User-supplied PNG with the same identifier | Yoga offer; local floor/fabric clone removes embedded label; lossless, all other pixels unchanged |
| `yoga-education.webp` | `EXP00908 copy.webp` | Retained prior yoga-offer asset |
| `conscious-connection.webp` | `EXP04557 copy.webp` | Retained unused original derivative |
| `programme-background.webp` | `EXP04556 copy.webp` | Clay programme background |
| `5faf67df-f8b9-4f15-be90-ca09eed6064b.png` | User-supplied composite | Hero background with group photograph, waves and fading already embedded |
| `guided-practice.webp` | `EXP00951 copy.webp` | Retained unused original derivative |
| `EXP04556 copy.webp` | Exact supplied WebP, unchanged | Conscious Pregnancy offer |
| `class-community.webp` | `EXP04508 copy.webp` | Getting-started card |
| `doctor-santoshi.webp` | `EXP07711 copy.webp` | FAQ; no facial edits |
| `dr-santoshi-web.webp` | Earlier user-supplied derivative | Retained unused asset |
| `EXP01338 (1) copy.webp` | Exact same-named original from WEBP folder | Sharp BirthWave approach portrait |
| `pregnancy.webp` | User-supplied exact filename | Blended left-side hero background |
| `pelvic-health-original-highres.webp` | Existing `reference/official-movement.jpg`, exact same photograph as `card (1).webp` | Large pelvic-health care card; matching crop at 2400 × 1600 from the 4672 × 7008 oriented original |
| `card (1).webp` | User-supplied exact filename | Retained untouched low-resolution original |
| `postpartum-consultation.webp` | `EXP07741 copy.webp` | Wider care consultation |
| `clinic-space.webp` | `EXP01310 copy.webp` | Benefits centre and final full-section background |
| `pregnancy-community.webp` | `EXP04556 copy.webp` | Retained unused original derivative |
| `consultation-notebook.webp` | `EXP07725 copy.webp` | First getting-started card |
| `maternity-moment.webp` | Original photographic tiles embedded in brand-guide page 4 | Retained original derivative; no longer used in the page or social preview |

The exact official wordmarks were downloaded from [BirthWave](https://www.thebirthwave.in/): `/brand/wordmark-shade.png` and `/brand/wordmark-cream.png`. They were not redrawn. The local Latin webfont files are the Plus Jakarta Sans and Poppins files published by the official site; regular-weight Poppins comes from Google Fonts. Both SIL Open Font Licenses are included in `public/fonts/`. Related care, privacy and terms destinations were sourced from its navigation. The postpartum destination is the existing [postpartum care chapter](https://www.thebirthwave.in/services#postpartum-care).

Essential asset gaps for a later approved photography pass: the supplied archive has no dedicated prenatal-yoga photographs, no mother-and-newborn postpartum portrait, and no individual photograph for each proposed Conscious Pregnancy activity. Relevant supplied clinic, movement-education and consultation photography is used with accurate alt text. No AI or external stock images were generated or added. Several official-site image descriptions did not match the underlying files; these descriptions were not reused. The replacement hero and FAQ photograph both come from the supplied archive. Confirm publication permissions for all patient/group images before a public launch.

## Both enquiry forms

Both locations use one compact component: required name and international phone, optional email, required interest, optional message (600 characters), and required unchecked enquiry-contact consent. Existing interest options remain unchanged. The latest brief removes the non-mandatory mode, pregnancy stage, preferred contact, referral source and promotional-consent fields. The client DOCX marks these optional/recommended rather than required. Phone validation accepts a leading international country code and 8–15 digits after formatting characters are removed; email validates only when supplied. Both forms have identical dimensions, controls and typography at equivalent viewport widths.

Neither form displays the repeated explanatory paragraph above submission, extra content below submission, or a separate expandable guidance row. The Privacy Policy link remains in the required consent. Both message fields retain the full privacy and urgent-care guidance through an accessible description and native hover tooltip, without an extra visible row or spacing. The form remains an enquiry, not a medical intake or appointment confirmation.

Successful frontend validation opens the exact final-override message:

> Thank you for your interest!
>
> Thank you for taking the first step towards a more connected pregnancy journey with The BirthWave.
>
> Done

The native modal contains focus, closes with Done or Escape, restores focus to the submit button and locks background scrolling while open. Frontend validation, duplicate prevention, disabled submission state and a recoverable error path are present. After successful validation the in-memory fields clear. Submission stays disabled until hydration, preventing a native form GET containing personal data if JavaScript fails.

**There is no form transmission, server API route, Google Sheet, Apps Script, CRM, database, email service, localStorage, sessionStorage, cookie persistence, console logging of personal details, live analytics or advertising integration.** The `submitEnquiry` seam resolves without side effects. The thank-you state never claims that an appointment was booked or the clinic received data.

## Future integration handoff

Replace only `submitEnquiry` in `lib/enquiry.ts` with an authorized service adapter. It receives a read-only `EnquiryData` object and context `{ placement: "hero" | "final", consentVersion: "2026-11-18" }`. Do not expose service credentials in browser code. Add an authenticated server-side endpoint and validate/normalize again on the server. Keep the selected interest and enquiry consent. International phone validation can be extended with a maintained telephone-number parser once the supported countries are confirmed.

Expected frontend fields:

```typescript
type EnquiryData = {
  fullName: string;
  mobile: string;
  email: string;
  interest: "Prenatal Yoga" | "Conscious Pregnancy updates" | "Both" | "";
  question: string;
  contactConsent: boolean;
};
```

Resolve only after actual acceptance by the future service. Reject on failure so the existing retry state is shown. Add server-side rate limiting, appropriate spam protection, idempotency and duplicate handling, consent records, retention/deletion controls, monitored routing, named lead owner, internal notification and next-contact date. Deduplicate phones without losing distinct enquiry intent. Do not send medical details to analytics. Do not treat this frontend demonstration as a real lead or conversion.

Future attribution requirements, deliberately inactive now: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `landing_page_path`, referring URL, timestamp, consent version, source channel and enquiry-type identifier. Implement consent-aware attribution and persistence only as part of the approved integration.

Future analytics events: `view_prenatal_lp`, `click_yoga_cta`, `click_conscious_cta`, `form_start`, `lead_submit_success`, `click_call`, `click_whatsapp`. Future CRM milestones: `lead_contacted`, `batch_details_sent`, `enrolled`, `attendance_confirmed`, `revenue_collected`. Keep form submission, contact, booking, attendance, paid enrolment and collected revenue separate. Operational lifecycle: New enquiry → Assigned → Contact attempted → Contacted → Batch/consult details shared → Enrolled / Not enrolled / Future follow-up.

## Items requiring clinic confirmation before any public launch

The master prompt specifically requests the discussed `₹4,500/month` for local review. All three fee appearances use one configuration. Confirm final fee, tax/GST treatment and inclusions before publishing; the page uses “Tax details confirmed at enrolment.” `yoga.showPrice` controls visibility consistently across offers, pricing and FAQ.

Class duration, frequency, timetable, capacity, current online/in-clinic availability, eligibility, instructor and verified credentials remain enquiry-based, with editable configuration. No schedule, instructor, session count or guarantee was invented. Conscious Pregnancy is still in development: all five components are proposed, the three-month duration is proposed, fee is to be announced and optional kits are not promised as included. No speculative programme prices, webinar promises or future postnatal package have been published.

Confirm programme curriculum, facilitators, format, dates, launch status and any future kit pricing. Confirm clinical copy, FAQs, eligibility, doctor credentials and photo permissions; confirm the brief's phone `+91 93630 31925`, WhatsApp `+91 79042 51378`, business ownership, routing, lead owner and response process. The existing site displays multiple telephone numbers; the brief remains the contact authority for this landing page. Confirm privacy/consent wording with the responsible team. Set the actual canonical route and indexing policy only when the destination and approvals are known; the review defaults to `noindex, nofollow` with no invented production canonical or medical Offer/review/event schema.

## Verification

Final checks completed on 18 November 2026:

- `npm run build`, `npm run typecheck` and `npm run lint` passed. The landing page is statically prerendered by Next.js.
- `scripts/content-audit.py` passed all 48 exact checks against the client DOCX, including complete descriptions, proposed activities, safety wording and FAQs. It reads the original document directly with Python's standard library, without depending on the ignored inspection folder.
- `scripts/browser-qa.js` covers compact form fields, optional-email and international-phone validation, required consent, identical form dimensions, exact thank-you copy, keyboard focus containment, CTA interest selection, FAQ controls, program hover/keyboard disclosures, exact image assets, open program introduction, care-card composition, approved straight section boundaries, navigation anchors, reduced motion, no personal-data transmission or persistence, five floating contact destinations and browser runtime errors. A touch-enabled mobile browser separately verified program-card tap opening and closing; field dimensions, padding, typography and radii matched between both forms. A nine-width geometry comparison confirmed unchanged photograph scale and position after the forms became shorter and the hero CTAs moved into one row.
- The latest refinement pass was rechecked after the contact toolbar, contact boxes, CTA, arrow, spelling and section-presentation changes; the run completed with no browser runtime errors.
- Responsive checks passed at 360, 390, 768, 1024, 1280, 1440 and 1920 pixels. All ten sections stack independently without horizontal overflow; the hero form sits on the right at desktop widths.
- Additional refinement checks passed at the 600/601-pixel FAQ breakpoint: the consultation image stays below its heading, the questions stay alongside it above the mobile breakpoint, and the two columns remain balanced. The benefits photograph is centered, and all headings retain one colour.
- Both enquiry flows also passed at 390 × 844, including a fully visible, centered modal and clearing of in-memory form values. Modal centering was also checked at 1440 × 1000, with zero automated accessibility violations while open. With JavaScript disabled, all ten sections render and submission stays disabled.
- The axe-core scan reported zero automated WCAG 2 A/AA and 2.1 AA violations. This is an automated check, not a complete accessibility certification. Keyboard interactions and mobile/desktop layouts were also reviewed directly.
- Desktop screenshots of every section and complete pages at 390, 768 and 1440 pixels were visually reviewed. `npm ci --dry-run --offline --no-audit --no-fund` passed against the lockfile.

QA artifacts stay in `output/playwright/` and are excluded from Git. The browser scripts are Playwright CLI `run-code --filename` functions and expect the local development server on port 3000. Original client documents and the complete master prompt remain in the project root for future maintainers.
