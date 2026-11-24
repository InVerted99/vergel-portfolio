/**
 * ─── PROJECTS ──────────────────────────────────────────────────────────────
 * The single source of truth for the Work section and every /work/[slug]
 * case-study page. Order here = order on the site. The entry with
 * `featured: true` gets the large spotlight card.
 *
 * Every project uses the same shape, so each card and case study reads the same way:
 *   type        Capstone · Team project · Personal project
 *   summary     one sentence: what it is
 *   highlights  three short wins shown on the card
 *   caseStudy   problem → what I did → outcome
 *
 * Covers live in /public/projects/. Leave `live` or `github` empty to hide the button.
 */
export const projects = [
  {
    slug: "lights-out-alerts-on",
    title: "Lights Out, Alerts On",
    fullTitle:
      "A Power Outage Detection and Forecasting using Verified Crowdsourced Data and Machine Learning Clustering Technique",
    type: "Capstone",
    role: "Lead Developer",
    period: "Mar 2026 – Sep 2026",
    summary:
      "An outage reporting system: residents report power outages from an Android app, and admins see every report plotted on a live map.",
    highlights: [
      "Led the development team",
      "Designed the resident Android app in Figma",
      "Built the React admin dashboard with Leaflet maps",
    ],
    tech: ["Figma", "React", "Leaflet", "Firebase", "Git"],
    cover: "/projects/lights-out.svg",
    coverAlt: "Stylised phone showing an outage report screen next to a glowing map pin.",
    tint: "#c6f432",
    featured: true,
    live: "",
    github: "",
    caseStudy: {
      problem:
        "When the power goes out, reports arrive through scattered calls and social media posts. Nobody has one clear view of where the outages are, so administrators have to piece the picture together by hand.",
      contributions: [
        "Designed the resident Android app in Figma, laying out the screens, navigation, and the user flow residents follow to report a power outage.",
        "Built a React admin dashboard with interactive Leaflet maps that plot outage reports by location.",
        "Led the development team and used Git and Firebase throughout development.",
      ],
      outcome: [
        "Administrators spot affected areas at a glance on a map instead of reading reports one by one.",
        "Residents get a short, guided flow for reporting an outage from their phone.",
      ],
      facts: [
        { label: "Role", value: "Lead Developer" },
        { label: "Type", value: "Capstone, TSU" },
        { label: "Timeline", value: "7 months" },
      ],
    },
  },
  {
    slug: "flashtastic",
    title: "Flashtastic",
    fullTitle: "A Mobile-First Flashcard and Quiz Web App for Exam Review with Spaced Repetition",
    type: "Personal project",
    role: "Design & Development",
    period: "Nov 2026",
    summary:
      "A mobile-first study app that turns pasted reviewers into flashcards and quizzes, with spaced repetition for exam review.",
    highlights: [
      "Imports plain text, Quizlet, CSV, or JSON",
      "Four study modes, including spaced repetition",
      "Light, dark, and calm themes",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Motion", "Supabase"],
    cover: "/projects/flashtastic.svg",
    coverAlt: "Three stacked flashcards on a phone, labelled identification, multiple choice, and true or false.",
    tint: "#a78bfa",
    live: "",
    github: "",
    caseStudy: {
      problem:
        "Students already have reviewers in notes, Quizlet sets, and spreadsheets, but turning them into something they can actually drill on a phone takes too long. I wanted pasting a reviewer to be the only setup step.",
      contributions: [
        "Built a mobile-first study app with Next.js, React, and Tailwind CSS that turns pasted reviewers (plain text, Quizlet exports, CSV, or JSON) into Identification, Multiple Choice, and True/False cards.",
        "Designed a distinct card style for each question type, with light, dark, and calm themes and smooth Motion animations.",
        "Created a phone-friendly layout with a bottom tab bar and large tap targets that adapts to tablet and desktop screens.",
        "Added four study modes (Learn, Quiz, Flashcards, and spaced repetition Review), user accounts, and set sharing through links and QR codes using Supabase.",
      ],
      outcome: [
        "One paste turns a reviewer into a ready-to-study set.",
        "Sets can be shared with classmates through a link or a QR code.",
      ],
      facts: [
        { label: "Role", value: "Solo build" },
        { label: "Focus", value: "Mobile-first UI" },
        { label: "Study modes", value: "4" },
      ],
    },
  },
  {
    slug: "shelftrack",
    title: "ShelfTrack",
    fullTitle:
      "A Web-Based Library Management System with QR-Based Circulation, Reservations, and Fine Tracking",
    type: "Team project",
    role: "Developer",
    period: "Oct 2026 – Nov 2026",
    summary:
      "A Laravel library system with role-based dashboards for admins, librarians, and members, covering QR checkout, reservations, and fines.",
    highlights: [
      "Built the librarian pages end to end",
      "QR-based book checkout and return",
      "Reservation limit backed by PHPUnit tests",
    ],
    tech: ["Laravel", "PHP", "Blade", "PHPUnit", "GitHub"],
    cover: "/projects/shelftrack.svg",
    coverAlt: "Library dashboard with a QR code, a loans table, and an overdue badge.",
    tint: "#fbbf24",
    live: "",
    github: "",
    caseStudy: {
      problem:
        "A library has to track who borrowed what, what is overdue, who reserved a book next, and who owes a fine. Librarians needed one place to do all of that quickly at the desk.",
      contributions: [
        "Built the librarian pages: the librarian dashboard, QR-based book checkout and return, active and overdue loan tracking, fine payment and waiver, and the reservation queue.",
        "Redesigned the error and validation message UI on the login and registration pages using Blade templates, making form errors clearer and more consistent.",
        "Added an admin-configurable limit on active reservations per member, with PHPUnit feature tests to confirm the rule works.",
        "Collaborated with teammates through GitHub branches and pull requests.",
      ],
      outcome: [
        "Librarians handle checkout, returns, loans, fines, and reservations from their own set of pages.",
        "Form errors on login and registration read clearly and look the same everywhere.",
        "The reservation limit is covered by automated feature tests.",
      ],
      facts: [
        { label: "Role", value: "Developer" },
        { label: "Type", value: "School team project" },
        { label: "Users", value: "Admin · Librarian · Member" },
      ],
    },
  },
  {
    slug: "md-viewer",
    title: "MD Viewer",
    fullTitle: "A Client-Side Markdown Viewer with Syntax Highlighting and Theme Support",
    type: "Personal project",
    role: "Design & Development",
    period: "Sep 2026",
    summary:
      "A browser-based Markdown viewer that renders GitHub-style Markdown with syntax highlighting, themes, and a live table of contents.",
    highlights: [
      "Syntax highlighting for about 40 languages",
      "Scroll-aware “On this page” outline",
      "Sanitized output, so embedded scripts never run",
    ],
    tech: ["Vite", "JavaScript", "CSS Variables"],
    cover: "/projects/md-viewer.svg",
    coverAlt: "Dark Markdown reader with a highlighted code block and an outline sidebar.",
    tint: "#38bdf8",
    live: "",
    github: "",
    caseStudy: {
      problem:
        "Reading a Markdown file outside a code host usually means raw text or a heavy editor. I wanted to drop a file into the browser and read it the way GitHub shows it, without uploading it anywhere.",
      contributions: [
        "Built a browser-based Markdown viewer with Vite that renders GitHub-style Markdown, including tables, task lists, and code blocks with syntax highlighting for about 40 languages.",
        "Designed a dark theme with a light mode toggle using CSS variables, a responsive layout, and an “On this page” outline that follows the reader’s scroll position.",
        "Added drag-and-drop file opening and sanitized the rendered output so scripts inside documents never run.",
      ],
      outcome: [
        "Files open and render entirely in the browser.",
        "Long documents stay easy to navigate with the scroll-aware outline.",
      ],
      facts: [
        { label: "Role", value: "Solo build" },
        { label: "Runs", value: "Client-side only" },
        { label: "Languages", value: "~40 highlighted" },
      ],
    },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
