// PATH: src/lib/leads.ts
// REPLACES existing file. Changes: confirmBooking() only moves pending -> confirmed; new completeAppointment().
import { db } from "@/db";
import { leads, reports, pdfs, type NewLead, type NewReport } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function createLead(input: {
  firstName: string;
  email: string;
  phone: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
}) {
  const [lead] = await db
    .insert(leads)
    .values({
      firstName: input.firstName,
      email: input.email,
      phone: input.phone,
      address: input.address,
      latitude: input.latitude,
      longitude: input.longitude,
    } satisfies NewLead)
    .returning();

  return lead;
}

export async function createReport(input: NewReport) {
  const [report] = await db.insert(reports).values(input).returning();
  return report;
}

export async function markGhlWebhookSent(leadId: string) {
  await db
    .update(leads)
    .set({ ghlWebhookSent: true, ghlWebhookSentAt: new Date(), updatedAt: new Date() })
    .where(eq(leads.id, leadId));
}

export async function confirmBooking(leadId: string) {
  // Only moves pending -> confirmed. A lead that is already "completed"
  // must never be pushed back (e.g. when they book a second visit).
  await db
    .update(leads)
    .set({ bookingStatus: "confirmed", bookingConfirmedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(leads.id, leadId), eq(leads.bookingStatus, "pending")));
}

export async function completeAppointment(leadId: string) {
  await db
    .update(leads)
    .set({ bookingStatus: "completed", updatedAt: new Date() })
    .where(eq(leads.id, leadId));
}

export async function savePdfRecord(input: {
  leadId: string;
  reportId: string;
  type: "partial" | "full";
  fileUrl: string;
}) {
  const [pdf] = await db
    .insert(pdfs)
    .values({
      leadId: input.leadId,
      reportId: input.reportId,
      type: input.type,
      fileUrl: input.fileUrl,
      emailedAt: new Date(),
    })
    .returning();
  return pdf;
}

export async function getLatestLeadByEmail(email: string) {
  return db.query.leads.findFirst({
    where: eq(leads.email, email),
    orderBy: (l, { desc }) => [desc(l.createdAt)],
    with: { reports: { orderBy: (r, { desc }) => [desc(r.createdAt)], limit: 1 } },
  });
}

export async function getLeadById(leadId: string) {
  return db.query.leads.findFirst({
    where: eq(leads.id, leadId),
    with: { reports: { orderBy: (r, { desc }) => [desc(r.createdAt)], limit: 1 } },
  });
}