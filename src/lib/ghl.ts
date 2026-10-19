// PATH: src/lib/ghl.ts
// REPLACES existing file (replaces the earlier version I sent). Changes: agentReportUrl added to the lead payload
// (sent as agent_report_url), and sendScoreUpdateToGhl() at the bottom (used by the 30-day cron). smsConsent stays.
/**
 * GoHighLevel (GHL) webhook integration.
 *
 * Sends lead data to a GHL "Inbound Webhook" trigger URL. GHL is a
 * one-way data receiver here — we push leads to it, we don't read from it.
 *
 * Requires GHL_WEBHOOK_URL in environment (.env.local).
 */

export interface GhlLeadPayload {
  leadId: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  estimatedValue: number;
  signalScore: number;
  signalTier: string;
  reportUrl: string | null;
  smsConsent: boolean;
  agentReportUrl?: string | null;
}

export class GhlWebhookError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "GhlWebhookError";
    this.status = status;
  }
}

export async function sendLeadToGhl(payload: GhlLeadPayload): Promise<void> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new GhlWebhookError("GHL_WEBHOOK_URL is missing from environment variables.");
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      internalLeadId: payload.leadId,
      firstName: payload.firstName,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      estimatedValue: payload.estimatedValue,
      signalScore: payload.signalScore,
      signalTier: payload.signalTier,
      report_url: payload.reportUrl ?? "",
      smsConsent: payload.smsConsent ? "Yes" : "No",
      agent_report_url: payload.agentReportUrl ?? "",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new GhlWebhookError(`GHL webhook failed (${res.status}): ${body}`, res.status);
  }
}


/* =====================================================================
   SCORE UPDATE — pushed by the 30-day cron after a score recalculation.
   Goes to a SECOND GHL Inbound Webhook (workflow "10 - Score Update"),
   which finds the contact by email and updates Estimated Value,
   Signal Score and Signal Tier so Day 30/45/60 emails show fresh data.

   Requires GHL_SCORE_UPDATE_WEBHOOK_URL in environment.
   ===================================================================== */

export interface GhlScoreUpdatePayload {
  leadId: string;
  email: string;
  address: string;
  estimatedValue: number;
  signalScore: number;
  signalTier: string;
}

export async function sendScoreUpdateToGhl(payload: GhlScoreUpdatePayload): Promise<void> {
  const webhookUrl = process.env.GHL_SCORE_UPDATE_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new GhlWebhookError("GHL_SCORE_UPDATE_WEBHOOK_URL is missing from environment variables.");
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      internalLeadId: payload.leadId,
      email: payload.email,
      address: payload.address,
      estimatedValue: payload.estimatedValue,
      signalScore: payload.signalScore,
      signalTier: payload.signalTier,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new GhlWebhookError(`GHL score update webhook failed (${res.status}): ${body}`, res.status);
  }
}