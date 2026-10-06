# Google Analytics 4

Property: **David Atef Portfolio**. Web stream: **Portfolio Website**.
Measurement ID: **G-8CF6F9426E** (public, not a secret).

The production hostname is explicitly allowed in `src/lib/analytics.js`. Local development and Vercel preview hosts do not send data. Update this hostname when moving to a custom domain. An optional `VITE_GA_MEASUREMENT_ID` build variable overrides the default ID.

Google's script loads only after the visitor accepts analytics. Rejecting leaves the site fully usable. Footer **Analytics settings** allows changing the choice. The privacy page describes collection and storage. No form values are included in analytics events; advertising personalization and Google signals are disabled.

React route changes send one `page_view` after the page metadata updates. Duplicate effects and hash-only changes do not send a second view. URLs and referrers omit queries and hashes. The first referrer is the referring site; later views reference the preceding portfolio page.

Events:
- `page_view`: route, title and previous page.
- `cv_download`: CV link click (not proof of a completed download).
- `project_link_click`: project slug and `live`/`source`.
- `contact_click`: `email`, `phone` or `whatsapp`.
- `social_click`: `github` or `linkedin`.
- `generate_lead`: only after successful contact API response. Email delivery must be configured for a submission to succeed.

In the stream's enhanced measurement settings, browser-history page changes, automatic outbound clicks, search, form interactions and file downloads are disabled to avoid double counting or unnecessary collection. Scroll and video measurement remain enabled. Initial automatic page views are disabled by `send_page_view: false` in the tag configuration.

Check **Reports > Realtime** after opening production and accepting analytics. Detailed reports take longer to populate. Visit **Admin > Data display > Events** to review events once received. Link clicks measure intent, not completed contact or job enquiries.

Verification: `npm test`, `npm run build`, `npm run test:seo`; browser-check accepting/rejecting, preferences reopening, SPA navigation and mobile layout.
