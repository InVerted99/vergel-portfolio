export const skillGroups = [
  {
    category: "Frontend Development",
    blurb: "Responsive, mobile-first interfaces.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    category: "UI/UX Design",
    blurb: "From wireframe to polished screens.",
    items: ["Figma", "Wireframing", "Prototyping", "Layout & Visual Design"],
  },
  {
    category: "Tools & Workflow",
    blurb: "How I collaborate and ship.",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Neon", "Render"],
  },
  {
    category: "Used in Projects",
    blurb: "Libraries and stacks from my builds.",
    items: ["Motion", "Leaflet", "Supabase", "Firebase", "Vite", "Laravel", "PHPUnit"],
  },
];

/** Flattened list for the marquee rows. */
export const allSkills = skillGroups.flatMap((g) => g.items);
