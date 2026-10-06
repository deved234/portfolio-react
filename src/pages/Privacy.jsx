import { profile } from "../data/profile";
export default function Privacy() {
  return <article className="section-shell">
    <header className="page-heading"><h1>Privacy policy.</h1><p>Last updated: 6 October 2026</p></header>
    <div className="privacy-copy">
      <p>This portfolio is operated by David Atef. Contact <a href={`mailto:${profile.email}`}>{profile.email}</a> with privacy questions.</p>
      <h2>Optional analytics</h2>
      <p>If you accept analytics, Google Analytics 4 helps me understand visits, device and approximate location information, traffic sources, pages viewed, CV downloads, and interactions with project and contact links. Analytics cookies help distinguish visitors and sessions. These reports help improve the portfolio.</p>
      <p>Google Analytics loads only after you accept. You can reject it and continue using the whole site, or change your choice using “Analytics settings” in the footer. Rejecting after acceptance disables further tracking and removes this site's Analytics cookies; it does not remove data already collected.</p>
      <p>I do not send your contact form's name, email address, company or message to Analytics. Advertising personalization and Google signals are disabled. Learn <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">how Google uses information from sites that use its services</a>.</p>
      <h2>Contact messages</h2>
      <p>If you submit the contact form when email delivery is enabled, the details you provide are processed by the hosting and email delivery services to send your message and allow me to reply. Contact details and messages are used to respond to your enquiry. You can also contact me directly by email.</p>
      <h2>Essential storage and hosting</h2>
      <p>Your browser stores your analytics choice, project display preferences and motion preferences. Session storage remembers whether the introduction has been shown. These settings support the site's functionality. Vercel hosts the site and may process technical request information to deliver and protect it.</p>
      <h2>Your choices</h2>
      <p>Use Analytics settings to change your preference, or clear this site's browser storage to reset saved choices. Contact me if you have a question or request about information you have shared.</p>
    </div>
  </article>;
}
