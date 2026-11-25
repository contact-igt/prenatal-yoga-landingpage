import Image from "next/image";
import { ArrowRight, CalendarDays, Check, Heart, Home as HomeIcon, MapPin, MessageCircle, Monitor, MoveUpRight, Phone, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Header } from "@/components/header";
import { EnquiryForm } from "@/components/enquiry-form";
import { EnquiryLink } from "@/components/ui/enquiry-link";
import { RevealObserver } from "@/components/ui/reveal";
import { FAQ } from "@/components/faq";
import { ProgrammeActivities } from "@/components/programme-activities";
import { VideoCarousel } from "@/components/video-carousel";
import { FloatingToolbar } from "@/components/floating-toolbar";
import { Footer } from "@/components/footer";
import { HeroImageAlignment } from "@/components/hero-image-alignment";
import { approachPoints, classActivities, onlineBenefits, onlineCopy as copy, onlinePoints, onlineSteps, videoCarouselItems } from "@/config/online-content";
import { site, yogaFee } from "@/config/site";

const benefitIcons = [MoveUpRight, Wind, Sparkles, Heart];
const onlineIcons = [HomeIcon, Monitor, Wind, CalendarDays];
const eligibilityIcons = [MoveUpRight, Wind, Heart, Sparkles, ShieldCheck];
const stepIcons = [MessageCircle, CalendarDays, ShieldCheck, Monitor];
const understandingFeatures = [
  { title: copy.hero.highlights[1], icon: MoveUpRight },
  { title: copy.hero.highlights[2], icon: Wind },
  { title: copy.hero.highlights[3], icon: HomeIcon },
];
const yogaPhoto = "/images/d056632c-5977-49a3-97ed-7995e66680f7-clean.webp";
const stepPhotos = [
  { src: "/images/consultation-notebook.webp", alt: "A doctor writing notes during a BirthWave consultation" },
  { src: "/images/postpartum-consultation.webp", alt: "A doctor discussing care with a couple at The BirthWave" },
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
            <ul className="hero-highlights">{copy.hero.highlights.map(item => <li key={item}><Check size={14} aria-hidden="true" /><span>{item}</span></li>)}</ul>
            <div className="hero-ctas hero-enter" style={{ animationDelay: "340ms" }}>
              <a className="button" href="#online-classes"><span>Explore Our Online Classes</span><ArrowRight className="directional-arrow" size={17} aria-hidden="true" /></a>
              <EnquiryLink target="hero">Get Class Details</EnquiryLink>
            </div>
          </div>
          <div className="hero-form-wrap hero-enter" style={{ animationDelay: "500ms" }}><EnquiryForm placement="hero" /></div>
        </div>
      </section>

      <section id="prenatal-yoga" className="section offers-section understanding-section" aria-labelledby="understanding-heading">
        <div className="container"><p className="eyebrow understanding-eyebrow" data-reveal="up">{copy.understanding.eyebrow}</p></div>
        <div className="container understanding-layout">
          <div className="understanding-header" data-reveal="up"><h2 id="understanding-heading">{copy.understanding.title}</h2></div>
          <div className="understanding-visual" data-reveal="up">
            <div className="understanding-cutout"><Image src="/images/prenatal-yoga-cutout.webp" alt="Illustration of an expectant mother seated in a relaxed yoga pose" fill unoptimized sizes="(max-width: 600px) 60vw, (max-width: 900px) 450px, 30vw" /></div>
            <svg className="understanding-feature-curve" viewBox="0 0 600 650" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M485 149 Q535 324 485 500" /></svg>
            <ul className="understanding-features">{understandingFeatures.map(({title,icon: Icon}) => <li key={title}><Icon size={19} strokeWidth={1.3} aria-hidden="true" /><h3>{title}</h3></li>)}</ul>
          </div>
          <div className="editorial-copy understanding-copy" data-reveal="up">
            <div className="copy-paragraphs understanding-description">
              {copy.understanding.paragraphs.map((p,index) => <p className={index===1||index===3 ? "understanding-emphasis" : undefined} key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section benefits-section" aria-labelledby="benefits-heading">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up"><div><p className="eyebrow">{copy.benefits.eyebrow}</p><h2 id="benefits-heading">{copy.benefits.title}</h2></div><p className="supporting-note">{copy.benefits.body}</p></div>
          <div className="benefits-composition">
            <div className="benefits-photo" data-reveal="image"><Image src="/images/clinic-space.webp" alt="The warm lounge and seating area inside The BirthWave clinic" fill sizes="(max-width: 700px) 85vw, 32vw" /></div>
            {onlineBenefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <article className={`benefit benefit-${index + 1}`} key={benefit.title} data-reveal={index % 2 ? "up" : "side"} data-delay={index * 70}><div className="benefit-top"><Icon size={23} strokeWidth={1.3} aria-hidden="true" /></div><h3>{benefit.title}</h3><p>{benefit.body}</p></article>; })}
            <div className="journey-cta benefits-cta" data-reveal="up"><EnquiryLink>Ask About Online Yoga Classes</EnquiryLink></div>
          </div>
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

      <section id="online-classes" className="section online-section" aria-labelledby="online-heading">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up"><div><p className="eyebrow">{copy.online.eyebrow}</p><h2 id="online-heading">{copy.online.title}</h2></div><div className="copy-paragraphs">{copy.online.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div>
          <div className="online-flow" data-reveal="up">
            <svg className="online-pathway-curve online-flow-curve" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true"><path d="M158 42 C280 42 365 117 500 117 S720 42 842 42 L1000 42" /></svg>
            <ol className="online-flow-points">{onlinePoints.map((point,index) => { const Icon=onlineIcons[index]; return index < 3 ? <li className="online-point" key={point.title}><div className="benefit-top"><Icon size={23} strokeWidth={1.3} aria-hidden="true" /></div><h3>{point.title}</h3><p>{point.body}</p></li> : <li className="online-point online-next-step" key={point.title}><Icon size={43} strokeWidth={1.2} aria-hidden="true" /><h3>{point.title}</h3><span className="next-step-rule" aria-hidden="true" /><p>{point.body}</p><EnquiryLink>Get Online Class Details</EnquiryLink><svg className="next-step-leaves" viewBox="0 0 180 120" fill="none" aria-hidden="true"><path d="M90 120 Q90 65 25 25 Q24 76 90 103 M90 120 Q92 54 145 8 Q159 68 90 103 M90 120 Q104 79 174 67 Q150 111 90 120 M90 120 Q54 86 5 83 Q29 122 90 120" /></svg></li>; })}</ol>
          </div>
          <p className="online-section-note"><Monitor size={15} aria-hidden="true" /><span>{copy.online.availability}</span></p>
        </div>
      </section>

      <section id="who-can-join" className="section offers-section" aria-labelledby="eligibility-heading">
        <div className="container">
          <div className="section-heading" data-reveal="up"><p className="eyebrow">{copy.eligibility.eyebrow}</p><h2 id="eligibility-heading">{copy.eligibility.title}</h2></div>
          <p className="eligibility-introduction" data-reveal="up">{copy.eligibility.introduction}</p>
          <div className="eligibility-orbit" data-reveal="up"><svg className="eligibility-orbit-lines" viewBox="0 0 640 640" fill="none" aria-hidden="true"><circle cx="320" cy="320" r="294" /><circle cx="320" cy="320" r="306" /><g><circle cx="85" cy="143" r="6" /><circle cx="555" cy="143" r="6" /><circle cx="50" cy="437" r="6" /><circle cx="590" cy="437" r="6" /><circle cx="320" cy="614" r="6" /></g></svg>
            <div className="eligibility-orbit-photo"><Image src={yogaPhoto} alt="An expectant mother seated on a yoga mat with relaxed hands" fill unoptimized sizes="(max-width: 600px) 75vw, 440px" /></div>
            <ul className="eligibility-points eligibility-orbit-points">{copy.eligibility.points.map((p,index) => { const Icon=eligibilityIcons[index]; return <li className={`orbit-point orbit-point-${index+1}`} key={p}><div className="benefit-top"><Icon size={23} strokeWidth={1.3} aria-hidden="true" /></div><p>{p}</p></li>; })}</ul>
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
          <ol className="journey-steps online-journey">{onlineSteps.map((step,index) => {const Icon=stepIcons[index];return <li key={step.title} data-reveal="up" data-delay={index*100}><div className="step-photo"><Image src={stepPhotos[index].src} alt={stepPhotos[index].alt} fill unoptimized={index===3} sizes="(max-width: 600px) 92vw, (max-width: 1150px) 45vw, 23vw" /></div><div className="step-copy"><div className="step-symbol"><Icon size={20} strokeWidth={1.4} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.body}</p></div></li>;})}</ol>
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
            <div className="clinic-contact"><address><strong>{site.name}</strong><div><MapPin size={21} aria-hidden="true" /><p>{copy.contact.address}</p></div></address><div className="contact-actions"><a className="contact-box" href={site.phoneHref}><Phone size={18} aria-hidden="true" /><span><strong>Phone</strong><small>{site.phone}</small></span></a><a className="contact-box" href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true" /><span><strong>WhatsApp</strong><small>{site.whatsapp}</small></span></a></div></div>
            <a className="button contact-team" href={site.whatsappHref} target="_blank" rel="noreferrer">Contact Our Team<ArrowRight className="directional-arrow" size={17} aria-hidden="true" /></a>
          </section>
        </div>
      </section>
    </main>
    <Footer />
    <RevealObserver /><HeroImageAlignment /><FloatingToolbar />
  </>;
}
