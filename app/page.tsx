import Image from "next/image";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Heart, MapPin, MessageCircle, MoveUpRight, Phone, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Header } from "@/components/header";
import { EnquiryForm } from "@/components/enquiry-form";
import { EnquiryLink } from "@/components/ui/enquiry-link";
import { RevealObserver } from "@/components/ui/reveal";
import { FAQ } from "@/components/faq";
import { activities, benefits, copy, steps } from "@/config/content";
import { navigation, site, yoga, yogaFee } from "@/config/site";

const benefitIcons = [MoveUpRight, Wind, Sparkles, Heart];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <section id="top" className="hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow hero-enter" style={{ animationDelay: "40ms" }}>{copy.hero.eyebrow}</p>
            <h1 id="hero-heading" className="hero-enter" style={{ animationDelay: "100ms" }}>Feel supported through pregnancy, <span>one gentle step at a time.</span></h1>
            <p className="hero-description hero-enter" style={{ animationDelay: "180ms" }}>{copy.hero.body}</p>
            <div className="hero-ctas hero-enter" style={{ animationDelay: "260ms" }}>
              <EnquiryLink target="hero" interest="Prenatal Yoga">Enquire About Prenatal Yoga</EnquiryLink>
              <a className="text-link" href="#conscious-pregnancy">Explore Conscious Pregnancy<ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <p className="hero-location hero-enter" style={{ animationDelay: "340ms" }}><MapPin size={17} aria-hidden="true" /><span>{copy.hero.support}</span></p>
            <div className="hero-photo hero-enter" style={{ animationDelay: "420ms" }}>
              <Image src="/images/maternity-moment.webp" alt="An expectant mother resting her hands and tiny knitted booties on her belly" fill sizes="(max-width: 900px) 92vw, 48vw" priority className="maternity-image" />
              <div className="hero-photo-caption"><span>Movement. Breath. Connection.</span><span className="photo-mark" aria-hidden="true">01 / 10</span></div>
            </div>
          </div>
          <div className="hero-form-wrap hero-enter" style={{ animationDelay: "500ms" }}><EnquiryForm placement="hero" /></div>
        </div>
      </section>

      <section id="your-support" className="section offers-section" aria-labelledby="offers-heading">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up"><div><p className="eyebrow"><span>02</span> TWO WAYS TO BEGIN</p><h2 id="offers-heading">{copy.offers.title}</h2></div><p>{copy.offers.body}</p></div>
          <div className="offer-grid">
            <article className="offer-panel yoga-offer" data-reveal="up">
              <div className="offer-image"><Image src="/images/yoga-education.webp" alt="A BirthWave educator guiding participants in a group learning session" fill sizes="(max-width: 700px) 92vw, 46vw" /><span className="image-label">PRENATAL YOGA</span></div>
              <div className="offer-copy"><p className="eyebrow">MOVEMENT & BREATH</p><h3>A little time for your body and breath.</h3><p>{copy.offers.yoga}</p><div className="offer-meta"><p className="offer-price">{yoga.showPrice ? <><strong>{yogaFee}</strong><span> / month</span></> : "Enquire about current fees."}</p><p className="small-copy">{yoga.tax}<br />{yoga.format}</p></div><EnquiryLink interest="Prenatal Yoga" className="text-link">Ask About Yoga Batches</EnquiryLink></div>
            </article>
            <article className="offer-panel conscious-offer" data-reveal="up" data-delay="100">
              <div className="offer-image"><Image src="/images/conscious-connection.webp" alt="Participants holding hands during a BirthWave group activity" fill sizes="(max-width: 700px) 92vw, 46vw" /><span className="image-label">CONSCIOUS PREGNANCY</span></div>
              <div className="offer-copy"><p className="eyebrow status-label"><span className="status-dot" /> PROGRAM IN DEVELOPMENT</p><h3>A more connected pregnancy experience.</h3><p>{copy.offers.conscious}</p><div className="offer-meta"><p className="programme-fee">Programme fee to be announced.</p><p className="small-copy">Approximately three months — proposed.</p></div><EnquiryLink interest="Conscious Pregnancy updates" className="text-link">Register Your Interest</EnquiryLink></div>
            </article>
          </div>
        </div>
      </section>

      <section id="why-prenatal-yoga" className="section benefits-section" aria-labelledby="benefits-heading">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up"><div><p className="eyebrow"><span>03</span> MOVE WITH AWARENESS</p><h2 id="benefits-heading">{copy.benefits.title}</h2></div><p>{copy.benefits.body}</p></div>
          <div className="benefits-composition">
            <div className="benefits-photo" data-reveal="image"><Image src="/images/guided-practice.webp" alt="A BirthWave facilitator demonstrating gentle movement during an education session" fill sizes="(max-width: 700px) 85vw, 32vw" /><span className="photo-note">A little space.<br />Just for you.</span></div>
            {benefits.map((benefit, index) => { const Icon = benefitIcons[index]; return <article className={`benefit benefit-${index + 1}`} key={benefit.title} data-reveal={index % 2 ? "up" : "side"} data-delay={index * 70}><div className="benefit-top"><span className="benefit-number">0{index + 1}</span><Icon size={23} strokeWidth={1.3} aria-hidden="true" /></div><h3>{benefit.title}</h3><p>{benefit.body}</p></article>; })}
          </div>
          <p className="safety-note" data-reveal="up"><ShieldCheck size={23} strokeWidth={1.4} aria-hidden="true" /><span>{copy.benefits.safety}</span></p>
        </div>
      </section>

      <section id="prenatal-yoga" className="section yoga-section" aria-labelledby="yoga-heading">
        <div className="container">
          <div className="section-heading split-heading" data-reveal="up"><div><p className="eyebrow"><span>04</span> YOUR GUIDED PRACTICE</p><h2 id="yoga-heading">{copy.yoga.title}</h2></div><p>{copy.yoga.body}</p></div>
          <div className="yoga-details" data-reveal="up">
            <div className="class-photo"><Image src="/images/class-community.webp" alt="A guided group session in The BirthWave’s bright education space" fill sizes="(max-width: 700px) 92vw, 35vw" /><span className="class-photo-label">Room to learn.<br />Space to feel supported.</span></div>
            <div className="yoga-price-panel"><p className="eyebrow">PRENATAL YOGA</p><div className="price-display">{yoga.showPrice ? <><strong>{yogaFee}</strong><span>per month</span></> : <strong className="enquire-price">Enquire about fees</strong>}</div><p className="tax-note">{yoga.tax}</p><p className="practice-label"><Check size={17} aria-hidden="true" />Guided pregnancy-appropriate practice.</p>
              <dl className="service-details"><div><dt>Class frequency & duration</dt><dd>{yoga.frequency}</dd></div><div><dt>Live online / in-clinic format</dt><dd>{yoga.format}</dd></div><div><dt>Batch days, timings & capacity</dt><dd>{yoga.batches}</dd></div><div><dt>Instructor & credentials</dt><dd>{yoga.instructor}</dd></div></dl>
              <p className="small-copy">{yoga.inclusions}</p><EnquiryLink interest="Prenatal Yoga">Get Batch & Enrolment Details</EnquiryLink>
            </div>
          </div>
        </div>
      </section>

      <section id="getting-started" className="section enrolment-section" aria-labelledby="enrolment-heading">
        <div className="container">
          <div className="journey-heading" data-reveal="up"><div><p className="eyebrow"><span>05</span> AT YOUR OWN PACE</p><h2 id="enrolment-heading">Getting started is simple.</h2></div><span className="journey-flourish" aria-hidden="true"><ArrowUpRight size={44} strokeWidth={1} /></span></div>
          <ol className="journey-steps">{steps.map((step, index) => <li key={step.title} data-reveal="up" data-delay={index * 100}><div className="step-index"><span>0{index + 1}</span>{index < 2 && <ArrowUpRight size={23} strokeWidth={1} aria-hidden="true" />}</div><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
          <div className="journey-cta" data-reveal="up"><EnquiryLink interest="Prenatal Yoga" className="button button-outline">Ask the Team About Joining</EnquiryLink></div>
        </div>
      </section>

      <section id="conscious-pregnancy" className="section conscious-section" aria-labelledby="conscious-heading">
        <div className="conscious-background"><Image src="/images/programme-background.webp" alt="" fill sizes="100vw" /></div>
        <div className="container conscious-layout">
          <div className="conscious-intro" data-reveal="up"><p className="eyebrow"><span>06</span> SOMETHING MORE IS TAKING SHAPE</p><p className="programme-status">PROGRAM IN DEVELOPMENT</p><h2 id="conscious-heading">{copy.conscious.title}</h2><p>{copy.conscious.body}</p>
            <dl className="programme-details"><div><dt><CalendarDays size={17} aria-hidden="true" />Duration</dt><dd>{copy.conscious.duration}</dd></div><div><dt>Format</dt><dd>{copy.conscious.format}</dd></div><div><dt>Pricing</dt><dd>{copy.conscious.pricing}</dd></div></dl>
            <EnquiryLink interest="Conscious Pregnancy updates" className="button button-dark">Keep Me Updated About the Programme</EnquiryLink>
          </div>
          <div className="activities" data-reveal="up" data-delay="100"><p className="eyebrow">THE PROPOSED EXPERIENCE</p>{activities.map((activity, index) => <article className="activity" key={activity.title}><span className="activity-number">0{index + 1}</span><div><p className="proposed-label">PROPOSED</p><h3>{activity.title}</h3><p>{activity.body}</p></div></article>)}</div>
          <p className="programme-disclaimer"><ShieldCheck size={22} aria-hidden="true" /><span>{copy.conscious.disclaimer}</span></p>
        </div>
      </section>

      <section id="our-approach" className="section doctor-section" aria-labelledby="doctor-heading">
        <div className="container doctor-layout">
          <div className="doctor-portrait" data-reveal="image"><div className="doctor-photo"><Image src="/images/doctor-santoshi.webp" alt="Dr. Santoshi Nandigam at her consultation desk at The BirthWave" fill sizes="(max-width: 700px) 92vw, 38vw" /></div><div className="doctor-caption"><span className="eyebrow">FOUNDER, THE BIRTHWAVE</span><h3>Dr. Santoshi Nandigam</h3><p>Consultant Obstetrician & Gynaecologist</p><p className="small-copy">MBBS, DNB (Obstetrics & Gynaecology)</p></div></div>
          <div className="doctor-copy" data-reveal="up"><p className="eyebrow"><span>07</span> THE BIRTHWAVE APPROACH</p><h2 id="doctor-heading">{copy.doctor.title}</h2><div className="approach-symbol" aria-hidden="true"><Heart strokeWidth={1} size={40} /></div><p>{copy.doctor.body}</p><EnquiryLink className="text-link">Start with a conversation</EnquiryLink></div>
        </div>
      </section>

      <section id="faqs" className="section faq-section" aria-labelledby="faq-heading">
        <div className="container faq-layout"><div className="faq-heading" data-reveal="up"><p className="eyebrow"><span>08</span> A LITTLE CLARITY</p><h2 id="faq-heading">Frequently Asked Questions</h2><EnquiryLink className="text-link">Ask our team</EnquiryLink></div><div data-reveal="up"><FAQ /></div></div>
      </section>

      <section id="postpartum-care" className="section postpartum-section" aria-labelledby="postpartum-heading">
        <div className="container postpartum-layout"><div className="postpartum-copy" data-reveal="up"><p className="eyebrow"><span>09</span> CARE BEYOND PREGNANCY</p><h2 id="postpartum-heading">{copy.postpartum.title}</h2><p>{copy.postpartum.body}</p><a className="text-link" href={site.postpartum}>Explore Postpartum Care<ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="postpartum-photo" data-reveal="image"><Image src="/images/postpartum-consultation.webp" alt="A BirthWave clinician in conversation with a woman and her partner" fill sizes="(max-width: 700px) 92vw, 40vw" /></div></div>
      </section>

      <section id="enquiry" className="section final-section" aria-labelledby="enquiry-heading">
        <div className="container final-grid"><div className="final-copy" data-reveal="up"><p className="eyebrow"><span>10</span> WE’RE HERE TO HELP</p><h2 id="enquiry-heading">{copy.enquiry.title}</h2><p>{copy.enquiry.body}</p><div className="contact-actions"><a className="button button-outline" href={site.phoneHref}><Phone size={17} aria-hidden="true" />Call The BirthWave</a><a className="text-link" href={site.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" />Message on WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></a></div><address><div><MapPin size={21} aria-hidden="true" /><p>{site.address}</p></div><a href={site.phoneHref}>Phone: {site.phone}</a><a href={site.whatsappHref} target="_blank" rel="noreferrer">WhatsApp: {site.whatsapp}</a></address><div className="clinic-photo"><Image src="/images/clinic-space.webp" alt="The warm, softly lit reception space at The BirthWave" fill sizes="(max-width: 900px) 92vw, 46vw" /></div></div><div data-reveal="up" data-delay="100"><EnquiryForm placement="final" /></div></div>
      </section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a href="#top" aria-label="The BirthWave — back to top"><Image src="/brand/logo-cream.png" width={192} height={94} alt="The BirthWave" /></a><p>Care that meets you where you are.</p></div><div><h2>Explore</h2><nav aria-label="Footer navigation">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div><div><h2>Care & support</h2><nav aria-label="Related care"><a href={site.antenatal}>Pregnancy & Antenatal Care</a><a href={site.birthPreparation}>Birth Preparation</a><a href={site.postpartum}>Postpartum Care</a></nav></div><div className="footer-contact"><h2>Find us in Chennai</h2><p>8/15 Mahalingapuram Main Road,<br />Nungambakkam, Chennai – 600034.</p><a href={site.phoneHref}>{site.phone}</a><a href={site.whatsappHref}>WhatsApp: {site.whatsapp}</a></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} The BirthWave. All rights reserved.</p><div><a href={site.privacy}>Privacy Policy</a><a href={site.terms}>Terms & Conditions</a><a href="#top" aria-label="Back to top"><ArrowUpRight size={18} aria-hidden="true" /></a></div></div></div></footer>
    <RevealObserver />
  </>;
}
