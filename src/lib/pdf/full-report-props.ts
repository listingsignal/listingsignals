// PATH: src/lib/pdf/full-report-props.ts
// NEW file. Builds the props for the full PDF from a lead + its latest report (shared by the
// appointment-completed webhook and the agent PDF route).
import { estimateConfidence, formatConfidence } from "@/lib/format";
import type { FullReportPdfProps } from "@/lib/pdf/FullReportPdf";
import type { Lead, Report } from "@/db/schema";

export function buildFullReportProps(lead: Lead, report: Report): FullReportPdfProps {
  const comparables = (report.comparables as FullReportPdfProps["comparables"]) ?? [];
  const marketStats = (report.marketStats as Record<string, unknown>) ?? {};

  const confidencePct = estimateConfidence(
    report.estimatedValue,
    report.priceRangeLow,
    report.priceRangeHigh,
  );

  return {
    address: lead.address,
    estimatedValue: `$${report.estimatedValue.toLocaleString()}`,
    rangeLow: `$${report.priceRangeLow.toLocaleString()}`,
    rangeHigh: `$${report.priceRangeHigh.toLocaleString()}`,
    confidenceLabel: formatConfidence(confidencePct),
    signalScore: report.signalScore,
    signalLabel: report.signalLabel,
    bedrooms: report.bedrooms ?? "N/A",
    bathrooms: report.bathrooms ?? "N/A",
    squareFootage: report.squareFootage ? `${report.squareFootage.toLocaleString()} sq ft` : "N/A",
    yearBuilt: report.yearBuilt ?? "N/A",
    comparables,
    medianPrice: (marketStats.medianPrice as number) ?? null,
    medianPricePerSqft: (marketStats.medianPricePerSquareFoot as number) ?? null,
    medianDaysOnMarket: (marketStats.medianDaysOnMarket as number) ?? null,
  };
}