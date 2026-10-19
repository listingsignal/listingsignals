// PATH: src/lib/agent-token.ts
// NEW file. Signed links for the private agent report. Needs AGENT_REPORT_SECRET in env.
import { createHmac, timingSafeEqual } from "crypto";

function sign(leadId: string, secret: string): string {
  return createHmac("sha256", secret).update(`agent-report:${leadId}`).digest("hex");
}

export function verifyAgentToken(leadId: string, token: string | undefined | null): boolean {
  const secret = process.env.AGENT_REPORT_SECRET;
  if (!secret || !token) return false;

  const expected = Buffer.from(sign(leadId, secret));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Returns null (and logs) if the secret is missing, so lead capture never breaks because of it. */
export function buildAgentReportUrl(origin: string, leadId: string): string | null {
  const secret = process.env.AGENT_REPORT_SECRET;
  if (!secret) {
    console.warn("AGENT_REPORT_SECRET is not set — agent report link not generated.");
    return null;
  }
  return `${origin}/agent/report/${leadId}?token=${sign(leadId, secret)}`;
}