import Image from "next/image";
import { Accessibility, ArrowRight, CalendarDays, Check, ClipboardPen, Flower2, Home as HomeIcon, MapPin, MessageCircle, Monitor, MonitorPlay, MoveUpRight, Phone, ShieldCheck, Video } from "lucide-react";
import { Header } from "@/components/header";
import { EnquiryForm } from "@/components/enquiry-form";
import { EnquiryLink } from "@/components/ui/enquiry-link";
import { RevealObserver } from "@/components/ui/reveal";
import { YogaIcon } from "@/components/ui/yoga-icon";
import { FAQ } from "@/components/faq";
import { ProgrammeActivities } from "@/components/programme-activities";
import { PrenatalGallery } from "@/components/prenatal-gallery";
import galleryStyles from "@/components/prenatal-gallery.module.css";
import { VideoCarousel } from "@/components/video-carousel";
import { FloatingToolbar, WhatsAppIcon } from "@/components/floating-toolbar";
import { Footer } from "@/components/footer";
import { HeroImageAlignment } from "@/components/hero-image-alignment";
import { approachPoints, classActivities, onlineBenefits, onlineCopy as copy, onlinePoints, onlineSteps, videoCarouselItems } from "@/config/online-content";
import { site, yogaFee } from "@/config/site";

const benefitIcons = ["warmup", "breathing", "mobility", "lotus"] as const;
const onlineCards = [
  { icon: HomeIcon, href: "#getting-started", label: "See how to join from home" },
  { icon: MonitorPlay, href: "#class-experience", label: "Explore the guided class activities" },
  { icon: Accessibility, href: "#who-can-join", label: "See who can join prenatal yoga" },
];
const onlineRoutine = onlinePoints[3];
const eligibilityIcons = ["practice", "breathing", "lotus", "guidance", "adaptation"] as const;
const stepIcons = [ClipboardPen, CalendarDays, ShieldCheck, Video];
const understandingFeatures = [
  { title: copy.hero.highlights[1], icon: "prenatal-pose" },
  { title: copy.hero.highlights[2], icon: "breathing" },
  { title: copy.hero.highlights[3], icon: "home" },
] as const;
const yogaPhoto = "/images/d056632c-5977-49a3-97ed-7995e66680f7-clean.webp";
const stepPhotos = [
  { src: "/images/consultation-notebook.webp", alt: "A doctor writing notes during a BirthWave consultation" },
  { src: "/images/yoga-education.webp", alt: "An instructor speaking to a group of prenatal class participants" },
  { src: "/images/doctor-santoshi.webp", alt: "An obstetrician at The BirthWave" },
  { src: yogaPhoto, alt: "An expectant mother seated on a yoga mat" },
];
const heroParagraphs = [copy.hero.paragraphs[0], copy.hero.paragraphs.slice(1).join(" ")];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <section id="top" className="hero online-hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-background" aria-hidden="true"><div className="hero-photo-layer"><Image src="/images/pregnancy.webp" alt="" fill unoptimized priority /></div></div>
            <p className="eyebrow hero-enter" style={{ animationDelay: "40ms" }}>{copy.hero.eyebrow}</p>
            <h1 id="hero-heading" className="hero-title-ending hero-enter" style={{ animationDelay: "100ms" }}>{copy.hero.title}</h1>
            <div className="hero-description hero-enter" style={{ animationDelay: "180ms" }}>{heroParagraphs.map(p => <p key={p}>{p}</p>)}</div>
            <ul className="hero-highlights">
              {copy.hero.highlights.map(item => (
                <li key={item}>
                  <span className="hero-highlight-check" aria-hidden="true"><Check size={13} strokeWidth={2.6} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="hero-ctas hero-enter" style={{ animationDelay: "340ms" }}>
              <a className="button button-outline" href="#online-classes"><span>Explore Our Online Classes</span><Monitor className="button-icon" size={17} aria-hidden="true" /></a>
              <EnquiryLink target="hero">Get Class Details</EnquiryLink>
            </div>
          </div>
          <div className="hero-form-wrap hero-enter" style={{ animationDelay: "500ms" }}><EnquiryForm placement="hero" /></div>
        </div>
      </section>

      <section id="prenatal-yoga" className="section offers-section understanding-section" aria-labelledby="understanding-heading">
        <div className="container understanding-layout">
          <div className="editorial-copy understanding-copy" data-reveal="up">
            <p className="eyebrow understanding-eyebrow">{copy.understanding.eyebrow}</p>
            <h2 id="understanding-heading">{copy.understanding.title}</h2>
            <div className="copy-paragraphs understanding-description">
              {copy.understanding.paragraphs.map((p,index) => <p className={index===1||index===3 ? "understanding-emphasis" : undefined} key={p}>{p}</p>)}
            </div>
          </div>
          <div className="understanding-visual" data-reveal="up">
            <div className="understanding-cutout"><Image src="/images/prenatal-yoga-cutout.webp" alt="Illustration of an expectant mother seated in a relaxed yoga pose" fill unoptimized sizes="(max-width: 600px) 60vw, (max-width: 900px) 450px, 30vw" /></div>
            <svg className="understanding-feature-curve" viewBox="0 0 600 650" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M485 149 Q535 324 485 500" /></svg>
            <ul className="understanding-features">
              {understandingFeatures.map(({ title, icon }) => (
                <li key={title}><span className="understanding-icon-badge"><YogaIcon name={icon} /></span><h3>{title}</h3></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="gallery" className={`section ${galleryStyles.section}`} aria-labelledby="gallery-heading">
        <div className={galleryStyles.heading} data-reveal="up">
          <div className={galleryStyles.title}>
            <p className="eyebrow">A LOOK INSIDE</p>
            <h2 id="gallery-heading">Prenatal Yoga in Practice</h2>
            <svg className={galleryStyles.illustration} viewBox="0 0 240 300" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
                <path d="M50 250 V130 C50 65 140 65 140 130 V250 M100 250 V130 C100 65 190 65 190 130 V250 M72 250 V130 C72 85 118 85 118 130 V250 M122 250 V130 C122 85 168 85 168 130 V250 M35 258 H205" />
                <path d="M120 42 C115 35 105 28 105 20 C105 11 116 10 120 17 C124 10 135 11 135 20 C135 28 125 35 120 42 Z" fill="currentColor" />
              </g>
            </svg>
          </div>
          <p className={galleryStyles.intro}>See guided stretches, supported movement and group practice from The BirthWave’s in-person sessions.</p>
        </div>
        <PrenatalGallery />
      </section>

      <section id="benefits" className="section benefits-section" aria-labelledby="benefits-heading">
        <div className="container">
          <div className="section-heading" data-reveal="up"><p className="eyebrow">{copy.benefits.eyebrow}</p><h2 id="benefits-heading">{copy.benefits.title}</h2></div>
          <div className="benefits-composition">
            <div className="benefits-photo" data-reveal="image"><Image src="/images/clinic-space.webp" alt="The warm lounge and seating area inside The BirthWave clinic" fill sizes="(max-width: 700px) 85vw, 32vw" /></div>
            {onlineBenefits.map((benefit, index) => (
              <article className={`benefit benefit-${index + 1}`} key={benefit.title} data-reveal={index % 2 ? "up" : "side"} data-delay={index * 70}>
                <div className="benefit-top"><YogaIcon name={benefitIcons[index]} /></div>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
            <div className="journey-cta benefits-cta" data-reveal="up"><EnquiryLink>Ask About Online Yoga Classes</EnquiryLink></div>
          </div>
        </div>
      </section>

      <section id="video-stories" className="section video-section" aria-labelledby="video-heading">
        <div className="container">
          <div className="section-heading video-section-heading" data-reveal="up">
            <p className="eyebrow">SEE THE EXPERIENCE</p>
            <h2 id="video-heading">A little movement. A little calm.</h2>
            <p>Take a quick look at the gentle, supportive atmosphere behind our prenatal yoga practice.</p>
          </div>
          <div data-reveal="up"><VideoCarousel items={videoCarouselItems} /></div>
        </div>
      </section>

      <section id="class-experience" className="section conscious-section" aria-labelledby="classes-heading">
        <div className="container"><p className="eyebrow experience-eyebrow" data-reveal="up">{copy.classes.eyebrow}</p></div>
        <div className="container conscious-layout experience-layout">
          <div className="conscious-intro"><div className="conscious-background" aria-hidden="true"><Image src="/images/5327da0d-608a-4e6b-b778-e0fa35152b5a.png" alt="" fill sizes="(max-width: 600px) 100vw, 50vw" /></div>
            <div className="conscious-intro-content" data-reveal="up"><div className="programme-story experience-story"><span className="experience-rule" aria-hidden="true" /><h2 id="classes-heading">{copy.classes.title}</h2><div className="copy-paragraphs">{copy.classes.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div></div>
          </div>
          <ProgrammeActivities items={classActivities} label={null} idPrefix="class-activity" kind="yoga" />
        </div>
        <div className="container experience-note-wrap"><p className="programme-disclaimer experience-note" data-reveal="up"><ShieldCheck size={22} aria-hidden="true" /><span>{copy.classes.note}</span></p></div>
      </section>

      <section id="online-classes" className="section online-section" aria-labelledby="online-heading">
        <div className="container online-layout">
          <div className="online-portrait" data-reveal="up">
            <div className="online-photo">
              <Image
                src="/images/online-prenatal-yoga-indian.webp"
                alt="An expectant Indian mother seated cross-legged on a yoga mat with her palms together"
                fill
                unoptimized
              />
            </div>
            <span className="online-portrait-badge" aria-hidden="true"><Flower2 strokeWidth={1.5} /></span>
          </div>
          <div className="online-intro" data-reveal="up">
            <p className="eyebrow">{copy.online.eyebrow}</p>
            <h2 id="online-heading">{copy.online.title}</h2>
            <div className="online-description">{copy.online.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <ol className="online-cards" data-reveal="up">
            {onlineCards.map(({ icon: Icon, href, label }, index) => {
              const point = onlinePoints[index];
              return <li key={point.title}>
                <div className="online-card-icon"><Icon strokeWidth={1.55} aria-hidden="true" /></div>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
                <a className="online-card-link" href={href} aria-label={label}><ArrowRight size={22} aria-hidden="true" /></a>
              </li>;
            })}
          </ol>
          <div className="online-routine" data-reveal="up">
            <span className="online-routine-icon"><CalendarDays strokeWidth={1.55} aria-hidden="true" /></span>
            <div className="online-routine-copy"><h3>{onlineRoutine.title}</h3><p>{onlineRoutine.body}</p></div>
            <EnquiryLink className="button online-routine-button" endIcon={<ArrowRight className="button-icon" size={20} aria-hidden="true" />}>Get Online Class Details</EnquiryLink>
          </div>
          <p className="online-section-note">{copy.online.availability}</p>
        </div>
      </section>

      <section id="who-can-join" className="section offers-section" aria-labelledby="eligibility-heading">
        <div className="container">
          <div className="section-heading" data-reveal="up"><p className="eyebrow">{copy.eligibility.eyebrow}</p><h2 id="eligibility-heading">{copy.eligibility.title}</h2></div>
          <p className="eligibility-introduction" data-reveal="up">{copy.eligibility.introduction}</p>
          <div className="eligibility-orbit" data-reveal="up"><svg className="eligibility-orbit-lines" viewBox="0 0 640 640" fill="none" aria-hidden="true"><circle cx="320" cy="320" r="294" /><circle cx="320" cy="320" r="306" /><g><circle cx="85" cy="143" r="6" /><circle cx="555" cy="143" r="6" /><circle cx="50" cy="437" r="6" /><circle cx="590" cy="437" r="6" /><circle cx="320" cy="614" r="6" /></g></svg>
            <div className="eligibility-orbit-photo"><Image src={yogaPhoto} alt="An expectant mother seated on a yoga mat with relaxed hands" fill unoptimized sizes="(max-width: 600px) 75vw, 440px" /></div>
            <ul className="eligibility-points eligibility-orbit-points">
              {copy.eligibility.points.map((point, index) => (
                <li className={`orbit-point orbit-point-${index + 1}`} key={point}>
                  <div className="benefit-top"><YogaIcon name={eligibilityIcons[index]} /></div>
                  <p>{point}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="eligibility-patient-note" data-reveal="up">{copy.eligibility.patient}</p>
          <div className="eligibility-support editorial-copy" data-reveal="up"><p className="guidance-question">{copy.eligibility.question}</p><p>{copy.eligibility.guidance}</p><EnquiryLink>Speak With Our Team</EnquiryLink></div>
        </div>
      </section>

      <section id="our-approach" className="section doctor-section" aria-labelledby="approach-heading">
        <div className="container approach-layout">
          <div className="doctor-copy approach-left" data-reveal="up"><p className="eyebrow">{copy.approach.eyebrow}</p><h2 id="approach-heading">{copy.approach.title}</h2><div className="copy-paragraphs">{copy.approach.paragraphs.map(p => <p key={p}>{p}</p>)}</div><div className="approach-context-photo"><Image src="/images/yoga-education.webp" alt="A BirthWave clinician explaining pregnancy care to participants" fill unoptimized sizes="(max-width: 900px) 90vw, 45vw" /></div></div>
          <div className="approach-right" data-reveal="up"><dl className="approach-points approach-points-boxed">{approachPoints.map(point => <div key={point.title}><dt>{point.title}</dt><dd>{point.body}</dd></div>)}</dl><p className="approach-conclusion">{copy.approach.conclusion}</p></div>
        </div>
      </section>

      <section id="yoga-specialist" className="section doctor-section" aria-labelledby="specialist-heading">
        <div className="container doctor-layout specialist-layout">
          <div className="doctor-copy specialist-copy" data-reveal="up"><p className="eyebrow">{copy.specialist.eyebrow}</p><h2 id="specialist-heading">{copy.specialist.title}</h2><div className="copy-paragraphs">{copy.specialist.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div>
          <div className="specialist-profile" data-reveal="up"><div className="doctor-photo specialist-photo"><Image src="/images/EXP01361 copy.webp" alt="Dr. Amudha Varshini at The BirthWave" fill unoptimized sizes="(max-width: 600px) 90vw, 40vw" /></div><div className="doctor-caption"><h3>{copy.specialist.name}</h3><p>{copy.specialist.qualification}</p><p className="small-copy">{copy.specialist.role}</p></div></div>
          <div className="specialist-cta-wrap" data-reveal="up"><EnquiryLink>Enquire About Prenatal Yoga</EnquiryLink></div>
        </div>
      </section>

      <section id="getting-started" className="section enrolment-section" aria-labelledby="enrolment-heading">
        <div className="container">
          <div className="journey-heading" data-reveal="up"><div><p className="eyebrow">{copy.steps.eyebrow}</p><h2 id="enrolment-heading">{copy.steps.title}</h2></div></div>
          <ol className="journey-steps online-journey">{onlineSteps.map((step,index) => {const Icon=stepIcons[index];return <li key={step.title} data-reveal="up" data-delay={index*100}><div className="step-photo"><Image src={stepPhotos[index].src} alt={stepPhotos[index].alt} fill unoptimized={index===3} sizes="(max-width: 600px) 92vw, (max-width: 1150px) 45vw, 23vw" /></div><div className="step-copy"><div className="step-symbol"><Icon strokeWidth={1.65} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.body}</p></div></li>;})}</ol>
          <div className="journey-cta" data-reveal="up"><EnquiryLink>Get Started With Prenatal Yoga</EnquiryLink></div>
        </div>
      </section>

      <section id="class-fees" className="section yoga-section" aria-labelledby="fees-heading">
        <div className="yoga-section-background" aria-hidden="true"><Image src="/images/2bdbbdf6-60eb-4fa4-aadd-c93e2a44c64a.png" alt="" fill sizes="100vw" /></div>
        <div className="container yoga-editorial-layout">
          <div className="yoga-intro" data-reveal="up"><p className="eyebrow">{copy.fees.eyebrow}</p><h2 id="fees-heading">{copy.fees.title}</h2><p>{copy.fees.body}</p></div>
          <div className="yoga-details" data-reveal="up"><div className="yoga-price-panel"><div className="price-summary"><p className="eyebrow">Monthly Fee</p><div className="price-display"><strong>{yogaFee}</strong><span>per month</span></div></div>
            <dl className="service-details">{copy.fees.details.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl>
            <p className="small-copy inclusions-note">{copy.fees.tax}</p><EnquiryLink>Enquire About Online Yoga Batches</EnquiryLink>
          </div></div>
        </div>
      </section>

      <section id="faqs" className="section faq-section" aria-labelledby="faq-heading">
        <div className="container faq-layout"><div className="faq-heading" data-reveal="up"><p className="eyebrow">{copy.faq.eyebrow}</p><h2 id="faq-heading">{copy.faq.title}</h2><div className="faq-photo"><Image src="/images/doctor-santoshi.webp" alt="Dr. Santoshi Nandigam during a consultation at The BirthWave" fill sizes="(max-width: 600px) 92vw, (max-width: 900px) 44vw, 36vw" /></div></div><div className="faq-questions" data-reveal="up"><FAQ /></div></div>
      </section>

      <section id="enquiry" className="section final-section" aria-label="Online prenatal yoga enquiry">
        <div className="final-background" aria-hidden="true"><Image src="/images/clinic-space.webp" alt="" fill sizes="100vw" /></div>
        <div className="container final-grid">
          <div className="final-form-wrap" data-reveal="up"><EnquiryForm placement="final" /></div>
          <section id="contact" className="final-copy" aria-labelledby="contact-heading" data-reveal="up">
            <h2 id="contact-heading">{copy.contact.title}</h2><p>{copy.contact.body}</p>
            <div className="clinic-contact">
              <address><strong>{site.name}</strong><div><MapPin size={21} aria-hidden="true" /><p>{copy.contact.address}</p></div></address>
              <div className="contact-actions">
                <a className="contact-box" href={site.phoneHref}>
                  <span className="contact-box-icon"><Phone size={19} aria-hidden="true" /></span>
                  <span className="contact-box-details"><strong>Call us</strong><small>{site.phone}</small></span>
                  <ArrowRight className="contact-box-arrow" size={17} aria-hidden="true" />
                </a>
                <a className="contact-box contact-box-whatsapp" href={site.whatsappHref} target="_blank" rel="noreferrer">
                  <span className="contact-box-icon"><WhatsAppIcon size={20} aria-hidden="true" /></span>
                  <span className="contact-box-details"><strong>WhatsApp</strong><small>{site.whatsapp}</small></span>
                  <MoveUpRight className="contact-box-arrow" size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <a className="button contact-team" href={site.whatsappHref} target="_blank" rel="noreferrer">Contact Our Team<MessageCircle className="button-icon" size={17} aria-hidden="true" /></a>
          </section>
        </div>
      </section>
    </main>
    <Footer />
    <RevealObserver /><HeroImageAlignment /><FloatingToolbar />
  </>;
}
