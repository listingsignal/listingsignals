// PATH: src/app/api/webhooks/appointment-completed/route.ts
// NEW file (replaces the earlier version I sent). Marks the lead Completed (unlocks the website report), then
// builds + emails the full PDF. Called by GHL workflow "09 - Appointment Completed". Builds the full PDF from the latest
// report, stores it, and emails the link to the homeowner.
import { NextRequest, NextResponse } from "next/server";
import { getLeadById, getLatestLeadByEmail, savePdfRecord, completeAppointment } from "@/lib/leads";
import { generateFullReportPdf } from "@/lib/pdf/generate";
import { buildFullReportProps } from "@/lib/pdf/full-report-props";
import { uploadPdf } from "@/lib/storage";
import { sendEmail, appointmentCompletedEmailHtml } from "@/lib/email";

export const runtime = "nodejs";

interface CompletedWebhookBody {
  internalLeadId?: string;
  internal_lead_id?: string;
  email?: string;
}

export async function POST(req: NextRequest) {
  let body: CompletedWebhookBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const bodyLeadId = body.internalLeadId ?? body.internal_lead_id;
  let lead = bodyLeadId ? await getLeadById(bodyLeadId) : null;

  // Fallback: match by email if the GHL contact has no internal lead id.
  if (!lead && body.email) {
    lead = await getLatestLeadByEmail(body.email);
  }

  if (!lead) {
    console.error("Appointment-completed webhook: could not match a lead:", body);
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  // Unlock the website report first, so it opens even if the PDF/email step fails.
  await completeAppointment(lead.id);

  const latestReport = lead.reports?.[0];
  if (!latestReport) {
    return NextResponse.json({ ok: true, pdfGenerated: false, emailSent: false });
  }

  try {
    const pdfBuffer = await generateFullReportPdf(buildFullReportProps(lead, latestReport));

    // Timestamped name: the booking webhook already saved reports/<id>-full.pdf,
    // and Vercel Blob refuses to overwrite an existing path.
    const fileUrl = await uploadPdf(`reports/${lead.id}-full-completed-${Date.now()}.pdf`, pdfBuffer);

    const pdfRecord = await savePdfRecord({
      leadId: lead.id,
      reportId: latestReport.id,
      type: "full",
      fileUrl,
    });

    const publicReportUrl = `${req.nextUrl.origin}/api/reports/download/${pdfRecord.id}`;

    const { sent } = await sendEmail({
      to: lead.email,
      subject: "Your Full Home Report from Listing Signal",
      html: appointmentCompletedEmailHtml({
        firstName: lead.firstName,
        reportUrl: publicReportUrl,
        address: lead.address,
      }),
    });

    return NextResponse.json({ ok: true, pdfGenerated: true, emailSent: sent, reportUrl: publicReportUrl });
  } catch (error) {
    console.error("Appointment-completed PDF/email failed:", error);
    return NextResponse.json({ ok: false, pdfGenerated: false, emailSent: false }, { status: 500 });
  }
}