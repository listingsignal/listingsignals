// PATH: src/app/api/agent/report/[leadId]/pdf/route.ts
// NEW file. Agent-only PDF download. Needs the signed ?token= from the agent report link.
import { NextRequest, NextResponse } from "next/server";
import { getLeadById } from "@/lib/leads";
import { verifyAgentToken } from "@/lib/agent-token";
import { generateFullReportPdf } from "@/lib/pdf/generate";
import { buildFullReportProps } from "@/lib/pdf/full-report-props";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> },
) {
  const { leadId } = await params;

  if (!verifyAgentToken(leadId, req.nextUrl.searchParams.get("token"))) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const lead = await getLeadById(leadId);
  const report = lead?.reports?.[0];
  if (!lead || !report) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const pdf = await generateFullReportPdf(buildFullReportProps(lead, report));

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="agent-report.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}