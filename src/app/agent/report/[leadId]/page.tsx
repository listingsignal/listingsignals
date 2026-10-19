// PATH: src/app/agent/report/[leadId]/page.tsx
// NEW file. Private agent-only report. Opens only with the signed ?token= link saved on the GHL contact
// ("Agent Report Url"). Never linked from any homeowner email/SMS. Not indexed by search engines.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLeadById } from "@/lib/leads";
import { verifyAgentToken } from "@/lib/agent-token";
import { estimateConfidence, formatConfidence } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agent Report | Listing Signal",
  robots: { index: false, follow: false },
};

interface Comp {
  formattedAddress?: string;
  distance?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  price?: number;
  daysOnMarket?: number | null;
  status?: string;
  correlation?: number;
}

const money = (v?: number | null) => (v == null ? "—" : `$${Math.round(v).toLocaleString("en-US")}`);

export default async function AgentReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ leadId: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { leadId } = await params;
  const { token } = await searchParams;

  if (!verifyAgentToken(leadId, token)) notFound();

  const lead = await getLeadById(leadId);
  const report = lead?.reports?.[0];
  if (!lead || !report) notFound();

  const comps = (report.comparables as Comp[]) ?? [];
  const stats = (report.marketStats as Record<string, number | null>) ?? {};
  const confidence = formatConfidence(
    estimateConfidence(report.estimatedValue, report.priceRangeLow, report.priceRangeHigh),
  );

  const statusStyle =
    lead.bookingStatus === "completed"
      ? "bg-[#1FAE9F]/15 text-[#0E8F82]"
      : lead.bookingStatus === "confirmed"
        ? "bg-[#1D4ED8]/10 text-[#1D4ED8]"
        : "bg-[#D97706]/10 text-[#B45309]";

  return (
    <main className="min-h-screen bg-[#F3F5F7] px-4 pb-16 pt-28 text-[#0B1E33]">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-2 inline-block rounded-full bg-[#0B1E33] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          Agent only — do not share
        </div>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{lead.address}</h1>
            <p className="mt-1 text-sm text-[#0B1E33]/60">
              Report generated {new Date(report.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
            </p>
          </div>
          <a
            href={`/api/agent/report/${lead.id}/pdf?token=${token}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#1FAE9F] px-5 py-3 text-sm font-semibold text-white"
          >
            Download full PDF
          </a>
        </div>

        {/* Lead */}
        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#0B1E33]/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1E33]/50">Homeowner</h2>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle}`}>
              {lead.bookingStatus}
            </span>
          </div>
          <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs text-[#0B1E33]/50">Name</p>
              <p className="font-semibold">{lead.firstName}</p>
            </div>
            <div>
              <p className="text-xs text-[#0B1E33]/50">Phone</p>
              <a className="font-semibold text-[#0E8F82]" href={`tel:${lead.phone}`}>{lead.phone}</a>
            </div>
            <div>
              <p className="text-xs text-[#0B1E33]/50">Email</p>
              <a className="break-all font-semibold text-[#0E8F82]" href={`mailto:${lead.email}`}>{lead.email}</a>
            </div>
          </div>
        </section>

        {/* Value + score */}
        <section className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#0B1E33]/5">
            <p className="text-xs uppercase tracking-wider text-[#0B1E33]/50">Estimated value</p>
            <p className="mt-1 text-3xl font-bold">{money(report.estimatedValue)}</p>
            <p className="mt-1 text-sm text-[#0B1E33]/60">
              {money(report.priceRangeLow)} – {money(report.priceRangeHigh)}
            </p>
            <p className="mt-1 text-xs text-[#0B1E33]/50">Confidence {confidence}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#0B1E33]/5">
            <p className="text-xs uppercase tracking-wider text-[#0B1E33]/50">Signal Score</p>
            <p className="mt-1 text-3xl font-bold text-[#0E8F82]">{report.signalScore}/100</p>
            <p className="mt-1 text-sm text-[#0B1E33]/60">{report.signalLabel}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#0B1E33]/5">
            <p className="text-xs uppercase tracking-wider text-[#0B1E33]/50">Property</p>
            <p className="mt-1 text-lg font-bold">
              {report.bedrooms ?? "—"} bd · {report.bathrooms ?? "—"} ba
            </p>
            <p className="mt-1 text-sm text-[#0B1E33]/60">
              {report.squareFootage ? `${report.squareFootage.toLocaleString()} sq ft` : "— sq ft"} · Built{" "}
              {report.yearBuilt ?? "—"}
            </p>
            {report.propertyDetailsEstimated && (
              <p className="mt-1 text-xs text-[#B45309]">Details estimated from comps</p>
            )}
          </div>
        </section>

        {/* Market stats */}
        <section className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            ["Median price (zip)", money(stats.medianPrice)],
            ["Median $/sq ft", money(stats.medianPricePerSquareFoot)],
            ["Median days on market", stats.medianDaysOnMarket != null ? `${stats.medianDaysOnMarket}` : "—"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#0B1E33]/5">
              <p className="text-xs uppercase tracking-wider text-[#0B1E33]/50">{label}</p>
              <p className="mt-1 text-xl font-bold">{value}</p>
            </div>
          ))}
        </section>

        {/* Comps */}
        <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#0B1E33]/5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0B1E33]/50">
            Comparable sales ({comps.length})
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#0B1E33]/10 text-xs text-[#0B1E33]/50">
                  <th className="py-2 pr-3 font-medium">Address</th>
                  <th className="py-2 pr-3 font-medium">Bd/Ba</th>
                  <th className="py-2 pr-3 font-medium">Sq ft</th>
                  <th className="py-2 pr-3 font-medium">Dist.</th>
                  <th className="py-2 pr-3 font-medium">Match</th>
                  <th className="py-2 text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {comps.map((c, i) => (
                  <tr key={i} className="border-b border-[#0B1E33]/5 last:border-0">
                    <td className="py-2.5 pr-3 font-medium">{c.formattedAddress ?? "—"}</td>
                    <td className="py-2.5 pr-3">{c.bedrooms ?? "—"}/{c.bathrooms ?? "—"}</td>
                    <td className="py-2.5 pr-3">{c.squareFootage ? c.squareFootage.toLocaleString() : "—"}</td>
                    <td className="py-2.5 pr-3">{c.distance != null ? `${c.distance.toFixed(2)} mi` : "—"}</td>
                    <td className="py-2.5 pr-3">{c.correlation != null ? `${Math.round(c.correlation * 100)}%` : "—"}</td>
                    <td className="py-2.5 text-right font-semibold">{money(c.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}