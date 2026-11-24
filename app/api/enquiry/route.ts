import { validateEnquiry, type EnquiryData } from "@/lib/enquiry";

export const runtime = "nodejs";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const sharedSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!scriptUrl || !sharedSecret) {
    return Response.json({ ok: false, error: "The enquiry service is not configured yet." }, { status: 503 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid enquiry payload." }, { status: 400 });
  }

  if (!isObject(input)) {
    return Response.json({ ok: false, error: "Invalid enquiry payload." }, { status: 400 });
  }

  const fullName = asString(input.fullName);
  const mobile = asString(input.mobile);
  const email = asString(input.email);
  const question = asString(input.question);
  const data: EnquiryData = {
    fullName,
    mobile,
    email,
    interest: "Prenatal Yoga",
    pregnancyWeeks: asString(input.pregnancyWeeks),
    question,
    contactConsent: input.contactConsent === true,
  };

  const errors = validateEnquiry(data);
  if (
    Object.keys(errors).length > 0
    || fullName.length > 100
    || mobile.length > 10
    || email.length > 254
    || question.length > 600
  ) {
    return Response.json({ ok: false, error: "Please check the enquiry fields and try again." }, { status: 400 });
  }

  const payload = {
    timestamp: new Date().toISOString(),
    fullName: data.fullName,
    mobile: data.mobile,
    email: data.email,
    pregnancyWeeks: data.pregnancyWeeks,
    question: data.question,
    contactConsent: data.contactConsent,
    apiKey: sharedSecret,
  };

  try {
    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const result = await upstream.json().catch(() => null) as { ok?: boolean } | null;

    if (!upstream.ok || !result?.ok) {
      return Response.json({ ok: false, error: "We could not send your enquiry. Please try again." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "We could not reach the enquiry service. Please try again." }, { status: 502 });
  }
}
