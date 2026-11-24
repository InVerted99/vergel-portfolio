/**
 * Global site content. Edit freely — everything on the site reads from here
 * or from the other files in /data.
 */
export const site = {
  name: "Vergel Cortez",
  firstName: "Vergel",
  lastName: "Cortez",
  role: "Frontend Developer & UI Designer",
  tagline: "I design interfaces in Figma, then build them mobile-first with React and Next.js.",
  description:
    "Vergel Cortez, Frontend Developer & UI Designer from Tarlac, Philippines. I design interfaces in Figma and build responsive, mobile-first web apps with React, Next.js, and Tailwind CSS.",
  location: "Moncada, Tarlac, Philippines",
  timezone: "Asia/Manila",
  availability: "Open to remote work & OJT",
  email: "vergelcortez99@gmail.com",
  /** Shown as written; `phoneHref` is the international form used for tap-to-call. */
  phone: "0998-274-1442",
  phoneHref: "tel:+639982741442",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vergelcortez.vercel.app",
  /** Put your exported CV at /public/resume.pdf (or change this path). */
  resume: "/resume.pdf",
  /**
   * Social links. Leave a value as an empty string to hide it.
   * Fill in your real profile URLs before deploying.
   */
  socials: {
    github: "",
    linkedin: "",
    facebook: "",
  },
  /** Optional portrait at /public/images/portrait.jpg — set to null to use the monogram art. */
  portrait: null,
};
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
export const about = {
  story: [
    "I'm a fourth-year Information Technology student at Tarlac State University, specializing in Web and Mobile Development, and a seven-time Dean's Lister.",
    "I design user interfaces in Figma and build them as responsive, mobile-first web apps with React, Next.js, and Tailwind CSS. Most recently I led the development team for Lights Out, Alerts On, a capstone outage reporting system with a live map dashboard.",
    "I work through Git and GitHub with my teammates and deploy my projects with Vercel, Neon, and Render.",
  ],
  stats: [
    { value: 4, suffix: "", label: "Projects shipped, from capstone to personal builds" },
    { value: 7, suffix: "×", label: "Dean's Lister at Tarlac State University" },
    { value: 3, suffix: "", label: "Certifications earned" },
    { value: 5, suffix: "", label: "Seminars attended in 2026" },
  ],
  currently: "Fourth year at TSU, building Flashtastic, and open to frontend OJT or junior roles.",
};
