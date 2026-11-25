import { validateEnquiry, type EnquiryData } from "@/lib/enquiry";

export const runtime = "nodejs";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getBackendUrl() {
  const configured = process.env.BIRTHWAVE_BACKEND_URL?.trim();
  if (!configured) return "";
  return configured.replace(/^(["'])(.*)\1$/, "$2").replace(/\/+$/, "");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

type BackendResponse = { success?: boolean; ok?: boolean; message?: string; details?: string[] };

export async function POST(request: Request) {
  const backendUrl = getBackendUrl();

  if (!backendUrl) {
    return Response.json({ ok: false, error: "The enquiry service is missing BIRTHWAVE_BACKEND_URL on the server." }, { status: 503 });
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
  const submissionId = asString(input.submissionId) || crypto.randomUUID();
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
    source_key: "birthwave_prenatal_yoga",
    name: data.fullName,
    phone: data.mobile,
    email: data.email,
    service: "Prenatal Yoga",
    pregnancy_weeks: data.pregnancyWeeks,
    message: data.question,
    consent: data.contactConsent,
    external_submission_id: submissionId,
    attribution: {
      source: "prenatal_yoga",
      channel: "Landing Page",
      landing_page: "/",
    },
  };

  try {
    const upstream = await fetch(`${backendUrl}/birthwave-public/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Key": "birthwave",
        "Idempotency-Key": submissionId,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const responseText = await upstream.text();
    let result: BackendResponse | null = null;
    try {
      result = JSON.parse(responseText) as BackendResponse;
    } catch {
      // Some upstream failures return an empty or non-JSON response.
    }

    if (!upstream.ok || result?.success === false || result?.ok === false) {
      console.error("[BirthWave] Backend rejected enquiry", {
        status: upstream.status,
        message: result?.message,
        details: result?.details,
      });
      const safeBackendMessage = upstream.status < 500 && result?.message ? result.message : "";
      const error = safeBackendMessage || "We could not send your enquiry. Please try again.";
      return Response.json({ ok: false, error }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[BirthWave] Could not reach lead backend", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ ok: false, error: "We could not reach the enquiry service. Please try again." }, { status: 502 });
  }
}
