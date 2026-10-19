// PATH: src/app/api/webhooks/booking-confirmed/route.ts
// REPLACES existing file. Change: booking now ONLY marks the lead as confirmed. The full PDF + email moved to
// /api/webhooks/appointment-completed (client wants the full report only after she marks the visit Completed).
import { NextRequest, NextResponse } from "next/server";
import { confirmBooking, getLeadById, getLatestLeadByEmail } from "@/lib/leads";

export const runtime = "nodejs";

interface BookingWebhookBody {
  internalLeadId?: string;
  internal_lead_id?: string;
  email?: string;
}

export async function POST(req: NextRequest) {
  let body: BookingWebhookBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const bodyLeadId = body.internalLeadId ?? body.internal_lead_id;
  let lead = bodyLeadId ? await getLeadById(bodyLeadId) : null;

  // Fallback: match by email if the GHL contact doesn't carry our internal lead id.
  if (!lead && body.email) {
    lead = await getLatestLeadByEmail(body.email);
  }

  if (!lead) {
    console.error("Booking webhook: could not match a lead:", body);
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  await confirmBooking(lead.id);

  return NextResponse.json({ ok: true });
}