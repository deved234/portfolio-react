# Review build — 30 September 2026

Implemented Home, all seven project detail routes, About, Contact and 404.
Removed the old gold/dark components and their unsupported statistics.

## Verified

- Production build passes.
- 9 Node test results pass (contact validation, origin checks, missing
  configuration, provider success/failure, network errors and throttling).
  Email provider calls are mocked; no email was sent.
- Browser checks: filters 7/3/2/2; seven items in Grid; List/Grid and filter state
  retained; Back returns to the collection with scroll position retained.
- About, Contact, all seven project routes and 404 checked at widths
  360, 390, 768 and 1440: no horizontal overflow.
- Menu navigation, Escape, focus containment/restoration and release of the
  scroll lock checked. Desktop Lenis background scroll stays fixed while the
  opened menu is active (1534 px before and after wheel input).
- Pointer preview and page-transition curtain checked with normal motion.
  Reduced-motion mode and the Hero pause control checked.
- Browser route/function checks reported no JavaScript exceptions. The 503
  network response on a valid contact form is expected until email is connected;
  the form correctly displays a delivery-unavailable message, never success.
- Screenshot review: full Home, project grid, About, Contact, mobile Home,
  mobile Contact and a project detail page. Sources are in `media-sources.md`.
- npm audit: zero reported vulnerabilities after targeted dependency updates.

## External setup still needed

1. A Resend key and verified sender to activate actual email delivery. Hosting
   firewall limits should be configured before publicly enabling delivery.
The user approved the current Saint George project cover. No replacement image
is outstanding; its approved URL remains unchanged.

This is a local review build, not a deployment. Live inbox delivery, hosting
rewrites on an actual Vercel deployment, Safari and real iOS hardware have not
been tested. No cross-device performance score or pixel-perfect match is claimed.
