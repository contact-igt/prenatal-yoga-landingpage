import { yoga, yogaFee } from "./site";

export const copy = {
  hero: {
    eyebrow: "PREGNANCY WELLNESS AT THE BIRTHWAVE",
    title: "Feel supported through pregnancy, one gentle step at a time.",
    body: "Make space for movement, breath and a more connected pregnancy experience. Explore guided prenatal yoga at The BirthWave, and discover the Conscious Pregnancy Program we are developing for expectant mothers. Our team can help you understand the available sessions and what may be suitable for your pregnancy.",
    support: "Nungambakkam, Chennai | Ask our team about current online and in-clinic options.",
  },
  offers: {
    title: "Choose the support that feels right for this stage.",
    body: "Some mothers are looking for a regular guided practice. Others want a broader experience that combines movement, reflection and wellbeing. Start with what you need today; our team will guide you through the available options.",
    yoga: "Guided pregnancy-appropriate movement, breathing and body awareness in a supportive setting, with participation based on individual medical suitability.",
    conscious: "A proposed three-month program bringing together prenatal yoga, mindful activities, guided movement, storytelling and relaxation-focused sessions. Details are being finalized by the BirthWave team.",
  },
  benefits: {
    title: "Care for yourself as your pregnancy changes.",
    body: "Pregnancy changes how you move, rest and feel from week to week. A guided class can provide a welcoming place to explore movement and breathing while staying mindful of your changing needs. The right activities and intensity depend on your medical history and your care team's advice.",
    safety: "Prenatal yoga is not a substitute for antenatal care. Speak with your obstetrician before beginning, especially if you have pregnancy complications or activity restrictions.",
  },
  yoga: {
    title: "Prenatal yoga at The BirthWave.",
    body: "Whether you are already receiving pregnancy care at The BirthWave or are reaching out for the first time, our team can explain the current prenatal yoga options, schedule and enrolment process. Sessions should be chosen in consultation with your obstetric care team.",
  },
  conscious: {
    title: "A thoughtful space for the journey before birth.",
    body: "The BirthWave is developing a Conscious Pregnancy Program designed to bring different aspects of pregnancy wellbeing into one guided experience. The current concept combines movement, moments of reflection and opportunities to feel more connected to your own pregnancy journey. The final programme structure, schedule, availability and pricing are still being worked out.",
    duration: "Approximately three months — proposed.",
    format: "Online and in-person possibilities being assessed; specific availability to be confirmed.",
    pricing: "Pricing to be announced after programme finalization.",
    disclaimer: "Relaxation, storytelling and similar wellbeing activities are optional supportive practices; they do not determine a baby's intelligence, personality or birth outcome and do not replace medical care.",
  },
  doctor: {
    title: "Pregnancy care that makes space for your questions.",
    body: "The BirthWave brings together pregnancy care, education and supportive services with an emphasis on informed choices and individual needs. Our approach is to help each person understand the options available to them, ask questions and make decisions in conversation with their care team.",
  },
  postpartum: {
    title: "Your care journey continues after birth.",
    body: "Needs can change after delivery too. The BirthWave's wider care pathways include postpartum recovery-related support, breastfeeding and pelvic health guidance, depending on individual needs. Ask the team which existing services are appropriate for you.",
  },
  enquiry: {
    title: "Start with a conversation.",
    body: "Interested in prenatal yoga, or would you like updates on our upcoming Conscious Pregnancy Program? Leave your details and our team can help you understand the next step.",
  },
};

export const benefits = [
  { title: "Guided movement", body: "Explore pregnancy-appropriate yoga and mobility practices under qualified supervision." },
  { title: "Breathing and body awareness", body: "Make time to notice your breath, movement and comfort." },
  { title: "Space to slow down", body: "Set aside time for a calm, intentional practice." },
  { title: "A supportive routine", body: "Stay connected with a regular practice adapted to your individual circumstances." },
];

export const steps = [
  { title: "Tell us a little about yourself.", body: "Share your contact details and what you are looking for; keep medical information minimal in the website form." },
  { title: "Check suitability and available batches.", body: "Our team will discuss the options available and advise you on any medical clearance or consultation needed before joining." },
  { title: "Choose a session that fits.", body: "Once availability and suitability are confirmed, the team will explain enrolment, the applicable fee and how to attend." },
];

export const activities = [
  { title: "Prenatal yoga", body: "A guided yoga component." },
  { title: "Mobility, strength and stretching", body: "Approximately weekly sessions proposed, with in-person delivery more developed than online delivery." },
  { title: "Sound-based relaxation", body: "Facilitated group sessions under consideration for online and in-person formats." },
  { title: "Storytelling and guided reflection", body: "Approximately monthly activities around writing, imagining and connecting with the pregnancy experience." },
  { title: "Optional maternity / postpartum essentials", body: "Curated kits or partner-supplied products under consideration; not confirmed as included in the programme fee." },
];

export const faqs = [
  { question: "When can I start prenatal yoga?", answer: "The right time depends on your pregnancy, health and activity history. Ask your obstetrician whether prenatal yoga is appropriate and which types of movement you should avoid or modify." },
  { question: "Is prenatal yoga suitable for everyone?", answer: "Not necessarily. Some medical conditions or pregnancy complications may require activity modifications or avoidance. Your obstetrician should advise you on suitability." },
  { question: "Are sessions online or in person?", answer: "Please contact our team for the currently available batch formats, timings and any eligibility requirements." },
  { question: "How much does prenatal yoga cost?", answer: yoga.showPrice ? `The discussed monthly fee is ${yogaFee}. Our team will confirm the current rate, taxes if applicable, class inclusions and enrolment details before you join.` : "Our team will confirm the current rate, taxes if applicable, class inclusions and enrolment details before you join." },
  { question: "Do I need to be an existing BirthWave patient?", answer: "Please enquire with the team. They can guide you through the registration process and any clinical clearance or consultation requirements." },
  { question: "What is the Conscious Pregnancy Program?", answer: "It is an upcoming, approximately three-month wellbeing programme currently being developed by The BirthWave. Planned elements include yoga, mobility, relaxation and storytelling-related activities. The final curriculum, price and dates will be announced once confirmed." },
  { question: "Will yoga or the programme guarantee a vaginal birth or a particular outcome for my baby?", answer: "No. Pregnancy and childbirth outcomes depend on many individual clinical factors. These wellbeing services are supportive offerings and are not guarantees of any birth or developmental outcome." },
  { question: "Does The BirthWave also provide postpartum care?", answer: "The BirthWave describes postpartum-related consultations and support within its wider services. A new structured postnatal strength/recovery programme was only discussed as a future idea; ask the team about currently available care." },
];
