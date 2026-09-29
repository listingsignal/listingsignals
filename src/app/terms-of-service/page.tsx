import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "Terms of Service | Listing Signal",
  description: "Terms of Service for using Listing Signal's website and services.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className={`${inter.className} mb-3 text-xl font-bold text-[#0B1E33]`}>{title}</h2>
      <div className={`${inter.className} space-y-3 text-[15px] leading-relaxed text-[#0B1E33]/75`}>
        {children}
      </div>
    </section>
  );
}

export default function TermsOfServicePage() {
  const lastUpdated = "September 29, 2026";

  return (
    <main className="min-h-screen bg-[#F3F5F7] py-26 px-4 md:px-6 xl:px-10">
      <div className="w-full max-w-[1380px] px-6 mx-auto rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(11,30,51,0.2)] py-10">
        <h1 className={`${inter.className} mb-2 text-3xl font-bold text-[#0B1E33]`}>Terms of Service</h1>
        <p className={`${inter.className} mb-10 text-sm text-[#0B1E33]/50`}>Last updated: {lastUpdated}</p>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using listingsignal.com (the &quot;Site&quot;), you agree to be bound by these Terms
            of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Site.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            Listing Signal provides an automated home value estimate and market insight report (&quot;Signal
            Score&quot;) based on publicly available and third-party real estate data. We also offer the option to
            schedule a free, no-obligation in-home review with one of our real estate professionals.
          </p>
        </Section>

        <Section title="3. Not a Formal Appraisal">
          <p>
            The home value estimates, comparable sales data, and Signal Scores provided through our Site are
            automated estimates generated using available market data and statistical models. They are provided
            for informational purposes only and{" "}
            <strong>do not constitute a formal appraisal</strong>. Actual home values may vary. For an accurate,
            professional valuation, please schedule a free home review or consult a licensed appraiser.
          </p>
        </Section>

        <Section title="4. Eligibility">
          <p>
            You must be at least 18 years old and have the legal authority to provide the property information
            you submit through our Site.
          </p>
        </Section>

        <Section title="5. Communications Consent">
          <p>
            By submitting your contact information through our Site, you agree that Listing Signal may contact you
            by email, phone, and text message (SMS) regarding your report, market updates, and scheduling a free
            home review. Message and data rates may apply. You may opt out of SMS at any time by replying{" "}
            <strong>STOP</strong>, and out of email by using the unsubscribe link in any email. See our{" "}
            <a href="/privacy-policy" className="font-semibold text-[#1FAE9F] underline">
              Privacy Policy
            </a>{" "}
            for more details.
          </p>
        </Section>

        <Section title="6. Free Home Review Appointments">
          <p>
            Scheduling a free home review does not obligate you to list your property with Listing Signal or any
            affiliated agent. There is no cost or commitment associated with booking or attending a free home
            review.
          </p>
        </Section>

        <Section title="7. Accuracy of Information">
          <p>
            You agree to provide accurate and complete information when using our Site, including your property
            address and contact details. We are not responsible for report inaccuracies resulting from incorrect
            information provided by you.
          </p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            All content on the Site, including the Listing Signal name, logo, Signal Score™ methodology, and
            report designs, is the property of Listing Signal and may not be copied, reproduced, or distributed
            without our prior written consent.
          </p>
        </Section>

        <Section title="9. Third-Party Data &amp; Services">
          <p>
            Our reports rely on data from third-party providers. We do not guarantee the accuracy, completeness,
            or timeliness of this data and are not liable for decisions made based on it.
          </p>
        </Section>

        <Section title="10. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, Listing Signal shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the Site or reliance on any information
            provided through it.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms from time to time. Continued use of the Site after changes are posted
            constitutes your acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            Questions about these Terms can be directed to:{" "}
            <a href="mailto:info@listingsignal.com" className="font-semibold text-[#1FAE9F] underline">
              info@listingsignal.com
            </a>
          </p>
        </Section>
      </div>
    </main>
  );
}