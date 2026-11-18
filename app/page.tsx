import Image from "next/image";
import { ArrowRight, BookOpen, CalendarDays, Check, Heart, MapPin, MessageCircle, MoveUpRight, Phone, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Header } from "@/components/header";
import { EnquiryForm } from "@/components/enquiry-form";
import { EnquiryLink } from "@/components/ui/enquiry-link";
import { RevealObserver } from "@/components/ui/reveal";
import { FAQ } from "@/components/faq";
import { ProgrammeActivities } from "@/components/programme-activities";
import { FloatingToolbar } from "@/components/floating-toolbar";
import { Footer } from "@/components/footer";
import { benefits, copy, steps } from "@/config/content";
import { site, yoga, yogaFee } from "@/config/site";

const benefitIcons = [MoveUpRight, Wind, Sparkles, Heart];
const stepIcons = [MessageCircle, ShieldCheck, CalendarDays];
const stepPhotos = [
  { src: "/images/pregnancy-community.webp", alt: "Participants connecting during a BirthWave group session" },
  { src: "/images/postpartum-consultation.webp", alt: "A doctor discussing care with a couple at The BirthWave" },
  { src: "/images/class-community.webp", alt: "A BirthWave educator guiding a group of participants" },
];

export default function Home() {
  const heroTitleEnding = copy.hero.title.indexOf("one gentle");
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <section id="top" className="hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow hero-enter" style={{ animationDelay: "40ms" }}>{copy.hero.eyebrow}</p>
            <h1 id="hero-heading" className="hero-enter" style={{ animationDelay: "100ms" }}><span className="hero-title-opening">{copy.hero.title.slice(0, heroTitleEnding)}</span><span className="hero-title-ending">{copy.hero.title.slice(heroTitleEnding)}</span></h1>
            <p className="hero-description hero-enter" style={{ animationDelay: "180ms" }}>{copy.hero.body}</p>
            <figure className="hero-visual hero-enter" style={{ animationDelay: "260ms" }}>
              <div className="hero-image-wrap">
                <div className="hero-photo"><Image src="/images/pregnancy.webp" alt="The warm entrance to a care room at The BirthWave" fill sizes="(max-width: 900px) 92vw, 48vw" priority className="maternity-image" /></div>
                <span className="hero-pregnancy-emblem" aria-hidden="true">
                  <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 23c-5-3-6-9-3-14 3-5 11-6 15-1 3 4 3 10-1 13" />
                    <path d="M26 22c-6 3-9 9-11 16m19-16c2 9 12 13 16 24 4 10 1 21-7 26-8 4-26 4-31-2-4-5 0-12 3-18l6-15m9-12c-5 4-7 9-6 15m-3-3c2 7 8 8 12 12m-9-9c0 7-4 12-6 17-3 6-2 11 2 15" />
                    <path d="M40 58c-5-6-11 0-6 5l6 6 6-6c5-5-1-11-6-5Z" />
                  </svg>
                </span>
              </div>
            </figure>
            <p className="hero-location"><MapPin size={15} aria-hidden="true" /><span>{copy.hero.support}</span></p>
            <div className="hero-ctas hero-enter" style={{ animationDelay: "340ms" }}>
              <EnquiryLink target="hero" interest="Prenatal Yoga">Enquire About Prenatal Yoga</EnquiryLink>
              <a className="button button-outline" href="#conscious-pregnancy">Explore Conscious Pregnancy<ArrowRight className="directional-arrow" size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-form-wrap hero-enter" style={{ animationDelay: "500ms" }}><EnquiryForm placement="hero" /></div>
        </div>
      </section>

      <section id="your-support" className="section offers-section" aria-labelledby="offers-heading">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up"><div><p className="eyebrow">TWO WAYS TO BEGIN</p><h2 id="offers-heading">{copy.offers.title}</h2></div><p className="supporting-note">{copy.offers.body}</p></div>
          <div className="offer-grid">
            <article className="offer-panel yoga-offer" data-reveal="up">
              <div className="offer-image"><Image src="/images/yoga-education.webp" alt="A BirthWave educator guiding participants in a group learning session" fill sizes="(max-width: 700px) 92vw, 46vw" /><span className="image-label">PRENATAL YOGA</span></div>
              <div className="offer-copy"><p className="eyebrow">MOVEMENT & BREATH</p><h3>A little time for your body and breath.</h3><p>{copy.offers.yoga}</p><ul className="offer-features"><li><Check size={15} aria-hidden="true" />Pregnancy-appropriate movement</li><li><Check size={15} aria-hidden="true" />Breathing & body awareness</li><li><ShieldCheck size={15} aria-hidden="true" />Individual medical suitability</li></ul><div className="offer-meta"><p className="eyebrow">YOUR REGULAR PRACTICE</p><p className="offer-price">{yoga.showPrice ? <><strong>{yogaFee}</strong><span> / month</span></> : "Enquire about current fees."}</p><p className="small-copy">{yoga.tax}</p><p className="offer-availability">{yoga.format}</p></div><EnquiryLink interest="Prenatal Yoga" className="text-link">Ask About Yoga Batches</EnquiryLink></div>
            </article>
            <article className="offer-panel conscious-offer" data-reveal="up" data-delay="100">
              <div className="offer-image"><Image src="/images/class-community.webp" alt="A BirthWave facilitator leading a supportive group session" fill sizes="(max-width: 700px) 92vw, 46vw" /><span className="image-label">CONSCIOUS PREGNANCY</span></div>
              <div className="offer-copy"><p className="eyebrow">CONNECTION & WELLBEING</p><h3>A more connected pregnancy experience.</h3><p>{copy.offers.conscious}</p><ul className="offer-features"><li><Wind size={15} aria-hidden="true" />Yoga & guided movement</li><li><BookOpen size={15} aria-hidden="true" />Reflection & storytelling</li><li><Heart size={15} aria-hidden="true" />Relaxation-focused sessions</li></ul><div className="offer-meta"><p className="eyebrow status-label"><span className="status-dot" /> PROGRAM IN DEVELOPMENT</p><p className="programme-fee">Program fee to be announced.</p><p className="small-copy"><CalendarDays size={15} aria-hidden="true" />Approximately three months — proposed.</p></div><EnquiryLink interest="Conscious Pregnancy updates" className="text-link">Register Your Interest</EnquiryLink></div>
            </article>
          </div>
        </div>
      </section>

      <section id="why-prenatal-yoga" className="section benefits-section" aria-labelledby="benefits-heading">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up"><div><p className="eyebrow">MOVE WITH AWARENESS</p><h2 id="benefits-heading">{copy.benefits.title}</h2></div><p className="supporting-note">{copy.benefits.body}</p></div>
          <div className="benefits-composition">
            <div className="benefits-photo" data-reveal="image"><Image src="/images/clinic-space.webp" alt="The warm lounge and seating area inside The BirthWave clinic" fill sizes="(max-width: 700px) 85vw, 32vw" /><span className="photo-note">A little space.<br />Just for you.</span></div>
            {benefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <article className={`benefit benefit-${index + 1}`} key={benefit.title} data-reveal={index % 2 ? "up" : "side"} data-delay={index * 70}><div className="benefit-top"><Icon size={23} strokeWidth={1.3} aria-hidden="true" /></div><h3>{benefit.title}</h3><p>{benefit.body}</p></article>; })}
          </div>
          <p className="safety-note" data-reveal="up"><ShieldCheck size={23} strokeWidth={1.4} aria-hidden="true" /><span>{copy.benefits.safety}</span></p>
        </div>
      </section>

      <section id="prenatal-yoga" className="section yoga-section" aria-labelledby="yoga-heading">
        <div className="yoga-section-background" aria-hidden="true"><Image src="/images/2bdbbdf6-60eb-4fa4-aadd-c93e2a44c64a.png" alt="" fill sizes="100vw" /></div>
        <div className="container yoga-editorial-layout">
          <div className="yoga-intro" data-reveal="up"><p className="eyebrow">YOUR GUIDED PRACTICE</p><h2 id="yoga-heading">{copy.yoga.title}</h2><p>{copy.yoga.body}</p></div>
          <div className="yoga-details" data-reveal="up">
            <div className="yoga-price-panel"><div className="price-summary"><p className="eyebrow">PRENATAL YOGA</p><div className="price-display">{yoga.showPrice ? <><strong>{yogaFee}</strong><span>per month</span></> : <strong className="enquire-price">Enquire about fees</strong>}</div><p className="tax-note">{yoga.tax}</p></div><p className="practice-label"><Check size={17} aria-hidden="true" />Guided pregnancy-appropriate practice.</p>
              <dl className="service-details"><div><dt>Class frequency & duration</dt><dd>{yoga.frequency}</dd></div><div><dt>Live online / in-clinic format</dt><dd>{yoga.format}</dd></div><div><dt>Batch days, timings & capacity</dt><dd>{yoga.batches}</dd></div><div><dt>Instructor & credentials</dt><dd>{yoga.instructor}</dd></div></dl>
              <p className="small-copy inclusions-note">{yoga.inclusions}</p><EnquiryLink interest="Prenatal Yoga">Get Batch & Enrolment Details</EnquiryLink>
            </div>
          </div>
        </div>
      </section>

      <section id="getting-started" className="section enrolment-section" aria-labelledby="enrolment-heading">
        <div className="container">
          <div className="journey-heading" data-reveal="up"><div><p className="eyebrow">AT YOUR OWN PACE</p><h2 id="enrolment-heading">Getting started is simple.</h2></div></div>
          <ol className="journey-steps">{steps.map((step, index) => { const Icon = stepIcons[index]; return <li key={step.title} data-reveal="up" data-delay={index * 100}><div className="step-photo"><Image src={stepPhotos[index].src} alt={stepPhotos[index].alt} fill sizes="(max-width: 600px) 92vw, 30vw" /></div><div className="step-copy"><div className="step-symbol"><Icon size={20} strokeWidth={1.4} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.body}</p>{index === 0 && <p className="step-caption">A moment of connection at a BirthWave group session.</p>}</div></li>; })}</ol>
          <div className="journey-cta" data-reveal="up"><EnquiryLink interest="Prenatal Yoga" className="button button-outline">Ask the Team About Joining</EnquiryLink></div>
        </div>
      </section>

      <section id="conscious-pregnancy" className="section conscious-section" aria-labelledby="conscious-heading">
        <div className="container conscious-layout">
          <div className="conscious-intro"><div className="conscious-background" aria-hidden="true"><Image src="/images/5327da0d-608a-4e6b-b778-e0fa35152b5a.png" alt="" fill sizes="(max-width: 600px) 100vw, 50vw" /></div><div className="conscious-intro-content" data-reveal="up"><div className="programme-story"><p className="eyebrow">SOMETHING MORE IS TAKING SHAPE</p><p className="programme-status">PROGRAM IN DEVELOPMENT</p><h2 id="conscious-heading">{copy.conscious.title}</h2><p>{copy.conscious.body}</p></div>
            <dl className="programme-details"><div><dt><CalendarDays size={17} aria-hidden="true" />Duration</dt><dd>{copy.conscious.duration}</dd></div><div><dt>Format</dt><dd>{copy.conscious.format}</dd></div><div><dt>Pricing</dt><dd>{copy.conscious.pricing}</dd></div></dl>
            <EnquiryLink interest="Conscious Pregnancy updates" className="button button-dark">Keep Me Updated About the Program</EnquiryLink>
          </div><p className="programme-disclaimer"><ShieldCheck size={22} aria-hidden="true" /><span>{copy.conscious.disclaimer}</span></p></div>
          <ProgrammeActivities />
        </div>
      </section>

      <section id="our-approach" className="section doctor-section" aria-labelledby="doctor-heading">
        <div className="container doctor-layout">
          <div className="doctor-portrait" data-reveal="image"><div className="doctor-photo"><Image src="/images/dr-santoshi-web.webp" alt="Dr. Santoshi Nandigam seated at her desk at The BirthWave" fill sizes="(max-width: 700px) 92vw, 38vw" /></div><div className="doctor-caption"><span className="eyebrow">FOUNDER, THE BIRTHWAVE</span><h3>Dr. Santoshi Nandigam</h3><p>Consultant Obstetrician & Gynaecologist</p><p className="small-copy">MBBS, DNB (Obstetrics & Gynaecology)</p></div></div>
          <div className="doctor-copy" data-reveal="up"><p className="eyebrow">THE BIRTHWAVE APPROACH</p><h2 id="doctor-heading">{copy.doctor.title}</h2><div className="approach-symbol" aria-hidden="true"><Heart strokeWidth={1} size={40} /></div><p>{copy.doctor.body}</p><EnquiryLink className="button button-outline">Start with a conversation</EnquiryLink></div>
        </div>
      </section>

      <section id="faqs" className="section faq-section" aria-labelledby="faq-heading">
        <div className="container faq-layout"><div className="faq-heading" data-reveal="up"><p className="eyebrow">A LITTLE CLARITY</p><h2 id="faq-heading">Frequently Asked Questions</h2><div className="faq-photo"><Image src="/images/doctor-santoshi.webp" alt="Dr. Santoshi Nandigam during a consultation at The BirthWave" fill sizes="(max-width: 600px) 92vw, (max-width: 900px) 44vw, 36vw" /></div><EnquiryLink className="button button-outline">Ask our team</EnquiryLink></div><div className="faq-questions" data-reveal="up"><FAQ /></div></div>
      </section>

      <section id="postpartum-care" className="section postpartum-section" aria-labelledby="postpartum-heading">
        <div className="container postpartum-layout">
          <div className="postpartum-copy" data-reveal="up"><p className="eyebrow">CARE BEYOND PREGNANCY</p><h2 id="postpartum-heading">{copy.postpartum.title}</h2><p>{copy.postpartum.body}</p><a className="button button-outline" href={site.postpartum}>Explore Postpartum Care<ArrowRight className="directional-arrow" size={17} aria-hidden="true" /></a></div>
          <div className="postpartum-cards" data-reveal="up" data-delay="100">
            <figure className="postpartum-card postpartum-card-large"><Image src="/images/doctor-santoshi.webp" alt="Dr. Santoshi Nandigam speaking with a patient at The BirthWave" fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 28vw" /><figcaption>Pelvic Health Guidance</figcaption></figure>
            <figure className="postpartum-card"><Image src="/images/postpartum-consultation.webp" alt="A couple discussing their care with a BirthWave doctor" fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 26vw" /><figcaption>Postpartum Recovery</figcaption></figure>
            <figure className="postpartum-card"><Image src="/images/card (2).webp" alt="A newborn baby’s hand holding an adult’s finger" fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 29vw, 20vw" /><figcaption>Breastfeeding</figcaption></figure>
          </div>
        </div>
      </section>

      <section id="enquiry" className="section final-section" aria-labelledby="enquiry-heading">
        <div className="final-background" aria-hidden="true"><Image src="/images/clinic-space.webp" alt="" fill sizes="100vw" /></div>
        <div className="container final-grid">
          <div className="final-form-wrap" data-reveal="up"><EnquiryForm placement="final" /></div>
          <div className="final-copy" data-reveal="up">
            <p className="eyebrow">WE’RE HERE TO HELP</p><h2 id="enquiry-heading">{copy.enquiry.title}</h2><p>{copy.enquiry.body}</p>
            <div className="clinic-contact"><address><div><MapPin size={21} aria-hidden="true" /><p>{site.address}</p></div></address><div className="contact-actions"><a className="contact-box" href={site.phoneHref}><Phone size={18} aria-hidden="true" /><span><strong>Call The BirthWave</strong><small>{site.phone}</small></span></a><a className="contact-box" href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={19} aria-hidden="true" /><span><strong>Message on WhatsApp</strong><small>{site.whatsapp}</small></span></a></div></div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <RevealObserver /><FloatingToolbar />
  </>;
}
