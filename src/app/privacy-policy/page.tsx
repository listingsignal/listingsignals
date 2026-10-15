// PATH: src/app/privacy-policy/page.tsx
// REPLACES existing file. Changes: SMS section updated for checkbox consent, new "No Sharing" and "Data Security" sections.
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "Privacy Policy | Listing Signal",
  description: "Privacy Policy for Listing Signal — how we collect, use, and protect your information.",
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

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 15, 2026";

  return (
    <main className="min-h-screen bg-[#F3F5F7] py-26 px-4 md:px-6 xl:px-10">
      <div className="w-full max-w-[1380px] px-6 mx-auto rounded-2xl bg-white shadow-[0_15px_40px_-20px_rgba(11,30,51,0.2)] py-10">
        <h1 className={`${inter.className} mb-2 text-3xl font-bold text-[#0B1E33]`}>Privacy Policy</h1>
        <p className={`${inter.className} mb-10 text-sm text-[#0B1E33]/50`}>Last updated: {lastUpdated}</p>

        <Section title="1. Who We Are">
          <p>
            Listing Signal (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website listingsignal.com
            (the &quot;Site&quot;) and provides automated home value estimates, market insights, and related real
            estate services to homeowners. This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our Site or interact with us.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>When you use our Site, we may collect the following information:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li><strong>Property Address</strong> — the address you enter to receive a home value report.</li>
            <li><strong>Contact Information</strong> — your first name, email address, and phone number, provided
              when you request a report.</li>
            <li><strong>Communication Data</strong> — records of emails, text messages, and calls exchanged with us,
              including booking and appointment details, and your SMS consent choice.</li>
            <li><strong>Usage Data</strong> — how you interact with our Site, including pages visited and links
              clicked, collected automatically through standard web technologies.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Generate your automated home value estimate and Signal Score report.</li>
            <li>Deliver your report and related updates by email.</li>
            <li>
              Contact you by email, and by text message (SMS) if you have agreed to receive texts, to follow up on
              your report, share market updates, and help you schedule a free home review. See Section 6 for
              details on SMS communications.
            </li>
            <li>Schedule and manage appointments for free home reviews.</li>
            <li>Improve and maintain our Site and services.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="4. How We Share Your Information">
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Service providers</strong> who help us operate our business, including property data
              providers, email delivery services, and our customer relationship management (CRM) platform, solely
              for the purpose of providing our services to you.
            </li>
            <li>Legal authorities, if required by law or to protect our rights.</li>
          </ul>
          <p>See Section 7 for how we treat mobile information and SMS opt-in data.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your information for as long as necessary to provide our services, including sending
            periodic market updates, unless you ask us to delete it sooner. You may request deletion of your
            information at any time by contacting us (see Section 11).
          </p>
        </Section>

        <Section title="6. SMS &amp; Email Communications">
          <p>
            Listing Signal sends text messages (SMS) only to users who have checked the optional SMS consent box on
            our form. The messages relate to your home value report, appointment confirmations and reminders for a
            free home review, and market updates. Message frequency varies. Message and data rates may apply.
          </p>
          <p>
            You can opt out of SMS messages at any time by replying <strong>STOP</strong> to any message. Reply{" "}
            <strong>HELP</strong> for help. You can opt out of email communications at any time by clicking the
            unsubscribe link included in our emails, or by contacting us directly.
          </p>
          <p>
            Consent to receive SMS messages is not a condition of purchasing any goods or services, and you can
            receive your home value report without agreeing to text messages. Carriers are not liable for delayed
            or undelivered messages.
          </p>
        </Section>

        <Section title="7. SMS Opt-In Data and No Sharing">
          <p>
            No mobile information will be shared with third parties or affiliates for marketing or promotional
            purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.
            Information sharing to subcontractors in support services, such as customer service, is permitted. All
            other use case categories exclude text messaging originator opt-in data and consent; this information
            will not be shared with any third parties.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p>
            We use reasonable administrative, technical and physical safeguards to protect your personal
            information, including encryption in transit (HTTPS), access controls limited to authorized personnel,
            and secure third-party service providers. No method of transmission or storage is completely secure,
            but we work to protect your information from unauthorized access, use or disclosure.
          </p>
        </Section>

        <Section title="9. Cookies &amp; Tracking Technologies">
          <p>
            Our Site may use cookies and similar technologies to remember your preferences and understand how you
            use our Site. You can control cookies through your browser settings.
          </p>
        </Section>

        <Section title="10. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction or deletion of your personal information.</li>
            <li>Opt out of marketing communications, including SMS, at any time.</li>
          </ul>
          <p>To exercise any of these rights, contact us using the information in Section 11.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            If you have questions about this Privacy Policy or how we handle your information, contact us at:{" "}
            <a href="mailto:info@listingsignal.com" className="font-semibold text-[#1FAE9F] underline">
              info@listingsignal.com
            </a>
          </p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
            updated &quot;Last updated&quot; date.
          </p>
        </Section>
      </div>
    </main>
  );
}