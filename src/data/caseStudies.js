// Case-study content for project pages, keyed by project slug.
// Every statement is sourced from the project's public repository (README,
// file structure, dependencies) or from details already approved in
// projects.js. Do not add metrics, dates or outcomes that are not documented.
export const caseStudies = {
  sufra: {
    challenge:
      "Restaurants each need a site of their own, in Arabic and English, with a menu they can edit and bookings they can trust. The platform had to stay fast for visitors, give owners real control over their pages and never accept more bookings than a restaurant can seat.",
    decisions: [
      {
        title: "Static pages with targeted refreshes",
        text: "Restaurant and dish pages are prerendered, and data reads sit behind Next.js caching with a tag per restaurant. When an owner saves a change in the dashboard, only that restaurant's pages are refreshed.",
      },
      {
        title: "Bookings that cannot overbook",
        text: "Seats for each half hour live in one document per restaurant and day, and a booking claims all of its half hours in a single conditional MongoDB update. Checking for room and taking the seats happen in one atomic step, without a transaction.",
      },
      {
        title: "One renderer for visitors and the editor",
        text: "A restaurant page is a list of typed blocks. The same block components render on the server for visitors and in the browser for the live preview, and edits are pure functions, which makes undo and autosave straightforward.",
      },
      {
        title: "Authentication written from the standards",
        text: "Passwords are hashed with Node's scrypt, sessions are random tokens in httpOnly cookies, and Google sign-in uses the OAuth 2.0 authorization code flow with PKCE and OpenID Connect, with the ID token verified against Google's keys.",
      },
      {
        title: "Checked on every push",
        text: "Continuous integration runs ESLint, unit tests, database tests of concurrent bookings, a production build and Playwright journeys with axe accessibility checks in both languages and both color modes.",
      },
    ],
  },
  rased: {
    challenge:
      "Freelancers in the Arab region follow opportunities on several platforms — Mostaql, Nafezly, Khamsat and KAF — and checking each one by hand is slow. RASED brings them into one Windows app that runs locally, without a RASED server or account.",
    decisions: [
      {
        title: "Independent monitoring per source",
        text: "Each platform is monitored through its RSS feed or public pages, and each source can be paused or have its alerts switched off on its own. Fetching slows down after errors and respects Retry-After headers.",
      },
      {
        title: "No stale alerts",
        text: "The first successful scan of a platform stores what already exists without notifying, so later desktop notifications only cover new opportunities that match the user's saved filters.",
      },
      {
        title: "Local-first data",
        text: "Projects, notes and settings are stored on the user's machine. Closing the window keeps monitoring in the tray, and updates can be downloaded and installed from inside the app.",
      },
      {
        title: "Optional assistance that stays in the user's hands",
        text: "An optional proposal assistant works with the user's own Gemini, OpenAI or Claude key, and a Chrome extension can fill an application draft on Mostaql and Nafezly. It never submits: the user reviews and sends it.",
      },
      {
        title: "Tested before each release",
        text: "The project runs type checking, linting, unit tests and end-to-end suites with temporary files and fixture data, and ships an installer with published SHA-256 checksums.",
      },
    ],
  },
  "egyzone-storefront": {
    challenge:
      "The storefront serves shoppers in Arabic, English and French, which means one interface has to switch between right-to-left and left-to-right layouts while keeping the shopping journey consistent and connected to the marketplace's backend.",
    decisions: [
      {
        title: "Localization with direction-aware layouts",
        text: "Translations are handled with i18next, and layouts follow the active language's direction so navigation, product pages and forms read naturally in RTL and LTR.",
      },
      {
        title: "Shared client state",
        text: "Zustand holds client state that several pages need, so shopping flows can share it without passing data through every component.",
      },
      {
        title: "Validated forms",
        text: "Account and checkout forms use React Hook Form with Zod schemas, so validation rules live in one place and errors are shown before a request is sent.",
      },
      {
        title: "API integration through Axios",
        text: "Catalogue, account and cart requests go to the marketplace's backend through Axios, with the interface reflecting what the backend returns.",
      },
    ],
  },
  "egyzone-dashboard": {
    challenge:
      "A multi-vendor marketplace needs two kinds of operators: administrators who manage the whole platform and merchants who manage their own catalogue and orders. Both need fast, consistent screens for data-heavy work.",
    decisions: [
      {
        title: "Role-aware navigation and route guards",
        text: "Admin and merchant users see their own navigation, and routes are guarded so each role only reaches the screens meant for it.",
      },
      {
        title: "Reusable tables and forms",
        text: "Product, category and order screens share table, pagination and form components, which keeps management pages consistent and quicker to build.",
      },
      {
        title: "Validation and reporting",
        text: "Management forms are validated with React Hook Form and Zod, and marketplace information is presented with Recharts components.",
      },
      {
        title: "Views connected to the marketplace API",
        text: "Product, category and order screens load and update data through the marketplace's backend with Axios, while Zustand keeps shared dashboard state in one place.",
      },
    ],
  },
  "sad-media": {
    challenge:
      "A creative agency selling motion graphics and UGC videos needed an Arabic-first website where the work itself — videos, packages and process — does the selling, with motion that supports the content instead of distracting from it.",
    decisions: [
      {
        title: "Content-driven sections",
        text: "Services, packages, FAQs, testimonials, brands and portfolio videos come from separate data files, so the page sections stay reusable and the content can change without touching layout code.",
      },
      {
        title: "Motion with GSAP and Lenis",
        text: "Scroll-based reveals, text animation, counters and a scroll-progress indicator are built with GSAP, with Lenis providing smooth scrolling.",
      },
      {
        title: "Small interactions with a clear purpose",
        text: "Magnetic buttons, a custom cursor, a testimonial slider and a WhatsApp contact button guide visitors towards viewing the work and getting in touch.",
      },
      {
        title: "Built on TanStack Start",
        text: "Routing uses TanStack Router within TanStack Start, with Tailwind CSS for the responsive RTL layouts.",
      },
    ],
  },
  "mova-agency": {
    challenge:
      "A video-editing agency has to show what editing changes, not just describe it. The website needed interactive ways for visitors to compare raw and edited footage and to explore editing styles for their own niche.",
    decisions: [
      {
        title: "Before-and-after comparisons",
        text: "A dedicated comparison slider lets visitors drag between the original and the edited result, making the value of the edit visible at a glance.",
      },
      {
        title: "A typed style playground",
        text: "Editing styles are defined as typed TypeScript presets — for example for viral short-form content or restaurants — each describing color grading, zoom cuts, sound effects and pacing that the playground presents interactively.",
      },
      {
        title: "Booking without leaving the page",
        text: "A booking modal opens from the navigation and calls to action, so visitors can request a call from any section.",
      },
      {
        title: "Motion on scroll",
        text: "Sections such as work, UGC, process and about animate into view with Motion, inside responsive Tailwind CSS layouts.",
      },
    ],
  },
  "luxe-retail": {
    challenge:
      "An online store has to keep many pieces of state in step — cart, wishlist, signed-in user and orders — while taking the shopper from browsing to a completed order without losing anything on reload.",
    decisions: [
      {
        title: "Persisted stores with Zustand",
        text: "Cart, authentication, orders and wishlist each have their own Zustand store, persisted so a reload keeps the shopper signed in with their cart intact.",
      },
      {
        title: "A multi-step checkout",
        text: "Checkout moves through review, shipping, payment and confirmation, with promo codes and a free-shipping threshold applied to the order total.",
      },
      {
        title: "Accounts and order history through an API",
        text: "Products and users come from a REST API; registration, sign-in and the address book use it, and each completed order is saved to the user's record so the profile can show order history.",
      },
      {
        title: "Protected routes and validated forms",
        text: "Profile and checkout routes are protected, forms are validated with Formik and Yup, and the interface includes search, sorting, categories and a dark mode.",
      },
    ],
  },
  shopzone: {
    challenge:
      "A marketplace has three audiences — customers, sellers and administrators — each with their own screens, permissions and data, plus payments, uploads and email, in both Arabic and English.",
    decisions: [
      {
        title: "Route groups per audience",
        text: "The Next.js App Router separates authentication, the customer storefront, the seller area and the admin panel into their own route groups and layouts.",
      },
      {
        title: "API routes and data models",
        text: "API routes cover products, categories, cart, wishlist, orders, reviews, promo codes and users, backed by Mongoose models for each.",
      },
      {
        title: "Payments, uploads and email",
        text: "Payments are handled with Stripe, including a webhook route; product images upload to Cloudinary; and email supports verification and password reset.",
      },
      {
        title: "Bilingual and validated",
        text: "next-intl provides Arabic and English messages, NextAuth handles sign-in, and forms are validated with React Hook Form and Zod.",
      },
    ],
  },
  "course-platform": {
    challenge:
      "A course platform needs different experiences for students and instructors — browsing, enrolling and following lessons on one side, creating courses and tracking them on the other — on top of an API that enforces who can do what.",
    decisions: [
      {
        title: "A two-part project",
        text: "The repository holds a Next.js web app and a separate Express API side by side, so the interface and the backend can be developed and deployed independently.",
      },
      {
        title: "A modular API",
        text: "The API is organized into modules for authentication, courses, lessons, enrollments, comments and the instructor dashboard, each with its own routes, controller, service and validation.",
      },
      {
        title: "Authorization in layers",
        text: "Middleware handles authentication, roles, request validation and errors on the API, while Next.js middleware redirects visitors away from private pages when they are not signed in.",
      },
      {
        title: "Considered loading and error states",
        text: "Course pages include dedicated loading, error and not-found states, alongside course cards, lesson lists, comments and star ratings.",
      },
    ],
  },
  "saint-george-market": {
    challenge:
      "An Arabic marketplace needed a storefront that feels quick while products load from the backend, and an admin area for managing what shoppers see — all on the frontend side of an existing Laravel/PHP backend.",
    decisions: [
      {
        title: "State with Redux Toolkit",
        text: "Storefront and admin data are organized in Redux Toolkit slices, with Axios handling communication with the backend services.",
      },
      {
        title: "Skeletons instead of blank screens",
        text: "Product cards, product details, categories and profile pages have skeleton loaders, so the layout is visible while data arrives.",
      },
      {
        title: "An admin interface on the frontend",
        text: "Protected admin pages manage products, categories, the homepage hero and contact messages through the backend's APIs.",
      },
      {
        title: "Arabic-first details",
        text: "Language handling, RTL layouts, page transitions, toast notifications and per-page SEO metadata complete the storefront.",
      },
    ],
  },
  "speak-english": {
    challenge:
      "An English-learning service needed one interface for two kinds of users: staff who follow attendance and students who work through lessons at their level.",
    decisions: [
      {
        title: "Role-based views",
        text: "A demonstration sign-in routes administrators and students to different dashboards with React Router.",
      },
      {
        title: "Attendance for staff",
        text: "The admin dashboard records students as present, absent or late, tracks time in and out, and summarizes attendance.",
      },
      {
        title: "A lesson library for students",
        text: "Students browse lessons grouped by level — beginner, intermediate and advanced — watch embedded videos and mark lessons as complete.",
      },
    ],
  },
  "gaming-hub": {
    challenge:
      "A gaming website should feel lively from the first screen. The goal was a bold, responsive landing experience together with a small playable game built without a framework.",
    decisions: [
      {
        title: "Responsive pages with Tailwind CSS",
        text: "Full-height hero sections and the hub page are laid out with Tailwind CSS utilities for a responsive, dark visual style.",
      },
      {
        title: "A game in plain JavaScript",
        text: "A tic-tac-toe page handles turns, win checking and resetting the board with plain JavaScript functions and DOM events.",
      },
    ],
  },
  medinest: {
    challenge:
      "A healthcare landing page must make essential information easy to find: who the provider is, which departments it offers and how to reach emergency care.",
    decisions: [
      {
        title: "Clear content structure",
        text: "The page moves from a hero banner to an introduction, featured departments and a 24/7 emergency care section, using semantic HTML sections and headings.",
      },
      {
        title: "Organized styles",
        text: "Shared styles and page-specific styles live in separate stylesheets, keeping the responsive CSS easier to maintain.",
      },
    ],
  },
};
