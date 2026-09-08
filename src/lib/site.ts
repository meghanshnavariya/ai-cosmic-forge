export const profile = {
  name: "Meghansh",
  role: "B.Tech CSE (AI/ML) Student",
  tagline: "B.Tech CSE (AI/ML) Student | AI/ML Enthusiast | Future AI Engineer",
  email: "meghanshnavariya3@gmail.com",
  location: "Alwar, Rajasthan, India",
  college: "JECRC",
  degree: "B.Tech in Computer Science Engineering (AI/ML)",
  status: "Currently Pursuing",
};

export const roles = [
  "AI/ML Enthusiast",
  "Future AI Engineer",
  "Developer",
  "Problem Solver",
  "Tech Explorer",
  "Builder",
];

export const skills = [
  { name: "C++", short: "C++", note: "Core language for systems and competitive problem solving.", hue: "#5aa9ff" },
  { name: "Python", short: "Py", note: "Primary language for AI/ML experiments and automation.", hue: "#7cd6ff" },
  {
    name: "Data Structures & Algorithms",
    short: "DSA",
    note: "Building strong problem-solving foundations every day.",
    hue: "#8f7bff",
  },
  {
    name: "Artificial Intelligence",
    short: "AI",
    note: "Exploring intelligent systems, agents and reasoning.",
    hue: "#a97bff",
  },
  {
    name: "Machine Learning",
    short: "ML",
    note: "Learning models, training pipelines and evaluation.",
    hue: "#6f8bff",
  },
  { name: "HTML", short: "HTML", note: "Semantic, accessible page structure.", hue: "#63b8ff" },
  { name: "CSS", short: "CSS", note: "Modern layouts, motion and design systems.", hue: "#5ad1ff" },
  { name: "JavaScript", short: "JS", note: "Interactive interfaces and web logic.", hue: "#9d8bff" },
  { name: "Git", short: "Git", note: "Version control and disciplined workflows.", hue: "#7aa6ff" },
  { name: "GitHub", short: "GH", note: "Collaboration, reviews and open source learning.", hue: "#b18bff" },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  placeholder?: boolean;
};

/**
 * Real project links are not available yet, so these are elegant placeholders.
 * Add title/description/tech/github/demo here as projects ship.
 */
export const projects: Project[] = [
  {
    title: "Project Slot 01",
    description:
      "Reserved for the first flagship build — an AI/ML project currently in development. Details will be deployed here soon.",
    tech: ["Python", "Machine Learning"],
    placeholder: true,
  },
  {
    title: "Project Slot 02",
    description: "Reserved for an upcoming web build combining interface design with intelligent behaviour.",
    tech: ["JavaScript", "CSS"],
    placeholder: true,
  },
  {
    title: "Project Slot 03",
    description: "Reserved for an algorithms / DSA focused build documenting problem-solving practice.",
    tech: ["C++", "DSA"],
    placeholder: true,
  },
];

export const timeline = [
  {
    phase: "Phase 01",
    title: "Student",
    body: `Started ${profile.degree} at ${profile.college}, building fundamentals in programming and mathematics.`,
  },
  {
    phase: "Phase 02",
    title: "Developer",
    body: "Practising DSA in C++ and Python while building web interfaces with HTML, CSS and JavaScript.",
  },
  {
    phase: "Phase 03",
    title: "AI/ML Engineer",
    body: "Working towards deep expertise in machine learning, intelligent systems and applied AI research.",
  },
];

export const experience = [
  {
    title: "Open Slot",
    org: "Internships & roles",
    body: "No professional experience recorded yet. This log updates as internships and roles begin.",
  },
];

export const certifications = [
  {
    title: "Open Slot",
    org: "Courses & certifications",
    body: "Certification records will appear here once completed and verified.",
  },
];
