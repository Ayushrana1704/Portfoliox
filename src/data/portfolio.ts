// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH — edit everything about the portfolio here.
// Items marked TODO are placeholders: replace with your real links.
// ---------------------------------------------------------------------------
import enterpriseAi from "../assets/projects/enterprise-ai.png";
import forgeAi from "../assets/projects/forge-ai.png";
import jobPortal from "../assets/projects/job-portal.png";
import quickChat from "../assets/projects/quick-chat.png";
export const profile = {
  name: "Ayush Rana",
  firstName: "Ayush",
  lastName: "Rana",
  role: "Full Stack Software Developer",
  tagline: "Building scalable web applications and AI-powered solutions.",
  location: "India",
  email: "ayushrana1704@gmail.com",
  phone: "+91 86890 79337",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/Ayushrana1704",
  linkedin: "https://www.linkedin.com/in/ayush-rana132321/",
  leetcode: "https://leetcode.com/u/AYUSH_RANA1704/",
  portfolio: "https://ornate-dodol-22bd4d.netlify.app/",
};

export const about = {
  paragraphs: [
    "I build software at the seams — where clean architecture, real performance and a considered interface meet.",
    "My work spans production web platforms and AI products built on retrieval and multi-agent orchestration.",
    "I care about the unglamorous parts too: the infrastructure, the error paths, the thing that holds up under load.",
    "B.Tech in Computer Science and Engineering (Cyber Physical Systems), VIT Chennai. Always shipping, always rewriting.",
  ],
  stats: [
    { value: 4, suffix: "+", label: "Featured projects" },
    { value: 20, suffix: "+", label: "Technologies" },
    { value: 3, suffix: "", label: "Certifications" },
    { value: 100, suffix: "%", label: "NPTEL score" },
  ],
};

export const skillGroups = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C / C++", "HTML", "CSS"],
  },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "FastAPI"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB", "Qdrant"] },
  { title: "Tools", items: ["Git", "GitHub", "Docker", "Vercel", "Render", "VS Code"] },
  {
    title: "APIs & Auth",
    items: ["REST APIs", "JWT", "Server-Sent Events", "Stripe API", "Socket.IO"],
  },
];

export const marqueeSkills = [
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "Qdrant",
  "Node.js",
  "Python",
  "MongoDB",
  "Socket.IO",
  "Tailwind CSS",
];

export type Project = {
  title: string;
  kicker: string;
  /** Domain motif used for the section background treatment. */
  motif: "neural" | "agents" | "board" | "chat";
  description: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  github: string;
  demo?: string;
  images: string[];
  featured?: boolean;
  architecture?: string[];
};

export const projects: Project[] = [
  {
    title: "Enterprise AI Knowledge Platform",
    kicker: "Retrieval-augmented generation",
    motif: "neural",
    description:
      "A hybrid retrieval platform that fuses lexical and semantic search so enterprise answers stay grounded in the actual corpus.",
    problem:
      "Enterprise teams sit on thousands of internal documents, and pure vector search quietly hallucinates while pure keyword search misses intent.",
    solution:
      "A hybrid retrieval pipeline that runs BM25 and Qdrant in parallel and merges both rankings with Reciprocal Rank Fusion, then streams a grounded, citation-backed answer over SSE.",
    features: [
      "Hybrid RAG: BM25 + Qdrant with Reciprocal Rank Fusion",
      "FastAPI backend with JWT, RBAC and SQLAlchemy",
      "React 19 + TypeScript frontend with SSE streaming",
      "Containerised Docker deployment",
    ],
    tech: ["FastAPI", "Qdrant", "React 19", "TypeScript", "SQLAlchemy", "Docker"],
    github: "https://github.com/Ayushrana1704/enterprise-rag",
    demo: "https://enterprise-rag-kappa.vercel.app",
    images: [enterpriseAi],
    featured: true,
    architecture: [
      "React 19 client",
      "FastAPI gateway",
      "JWT + RBAC",
      "Hybrid retrieval — BM25 + Qdrant + RRF",
      "LLM synthesis",
      "Streaming response (SSE)",
    ],
  },
  {
    title: "ForgeAI",
    kicker: "Multi-agent engineering platform",
    motif: "agents",
    description:
      "An enterprise platform that orchestrates nine specialised agents across the software engineering lifecycle, from spec to deployment.",
    problem:
      "A single general-purpose agent degrades fast across the full software lifecycle — planning, coding, reviewing and shipping all need different context.",
    solution:
      "An orchestration layer that splits the lifecycle across nine specialised agents with shared state in PostgreSQL, each scoped to one job and handing off explicitly.",
    features: [
      "Orchestration layer coordinating 9 specialised agents",
      "FastAPI + PostgreSQL core, containerised with Docker",
      "React + TypeScript control surface",
      "Deployed across Render, Vercel and Neon",
    ],
    tech: ["FastAPI", "PostgreSQL", "Docker", "React", "TypeScript", "Neon"],
    github: "https://github.com/Ayushrana1704/ForgeAI",
    demo: "https://forge-ai-lac-eta.vercel.app",
    images: [forgeAi],
    architecture: [
      "User brief",
      "Planner agent",
      "Developer agent",
      "Reviewer agent",
      "Tester agent",
      "Documentation agent",
      "Deployment agent",
      "Shipped output",
    ],
  },
  {
    title: "Full Stack Job Portal",
    kicker: "Two-sided marketplace",
    motif: "board",
    description:
      "A recruiting platform with separate dashboards for recruiters and candidates, built on role-based access from the ground up.",
    problem:
      "Recruiters and candidates need the same data through completely different lenses, and bolting roles on late turns into a permissions mess.",
    solution:
      "Role-based authentication designed in from the first migration, driving two distinct dashboards over one MongoDB core with Cloudinary-backed media.",
    features: [
      "Recruiter and candidate dashboards",
      "Role-based authentication and authorisation",
      "MongoDB persistence with Cloudinary media",
      "MERN stack end to end",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    github: "https://github.com/Ayushrana1704/Job-Search",
    demo: "https://job-portal-umber-two.vercel.app/",
    images: [jobPortal],
    architecture: [
      "Candidate",
      "Authentication + roles",
      "Job listings",
      "Application submitted",
      "Employer dashboard",
      "MongoDB + Cloudinary",
    ],
  },
  {
    title: "Real-Time Chat Application",
    kicker: "Low-latency messaging",
    motif: "chat",
    description:
      "One-to-one messaging over persistent websockets, with authenticated sessions and durable message history.",
    problem:
      "Polling-based chat feels broken at any real scale, and naive socket setups lose messages the moment a client drops.",
    solution:
      "Socket.IO transport with JWT-authenticated handshakes and MongoDB persistence, so history survives reconnects and delivery stays sub-second.",
    features: [
      "One-to-one real-time messaging",
      "Socket.IO bidirectional transport",
      "JWT authentication",
      "MongoDB message persistence",
    ],
    tech: ["Socket.IO", "Node.js", "JWT", "MongoDB", "React"],
    github: "https://github.com/Ayushrana1704/Quich-Chat",
    demo: "https://quick-chat-client-beryl.vercel.app/login",
    images: [quickChat],
    architecture: [
      "User A",
      "Socket.IO handshake",
      "JWT authentication",
      "Message server",
      "MongoDB persistence",
      "User B",
    ],
  },
];

export const certifications = [
  {
    title: "Microsoft Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft · Jul 2024",
    href: "https://drive.google.com/file/d/1bOueBRMT-d8RYDjje_2OSBVqIurnAg5H/view",
  },
  {
    title: "IBM Artificial Intelligence Fundamentals",
    issuer: "IBM · Jul 2026",
    href: "https://www.credly.com/badges/ebbda281-b1c4-4e6c-b963-f39c948fae0d/public_url",
  },
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy · Sept 2025",
    href: "https://drive.google.com/file/d/104wcQbvp8LKH2_BFExLXVbzUTF6pAdMj/view",
  },
];

export const achievements = [
  { title: "Top 10 — LIBATHON 2025", detail: "36-hour hackathon at VIT Chennai" },
  { title: "Top 1% in NPTEL", detail: "Perfect score 100/100, certified by IIT Kanpur" },
];

export const leadership = [
  { title: "NSS Club Lead", detail: "Coordinated 20+ volunteers across campus initiatives" },
  { title: "Hostel Representative", detail: "Represented 300+ students with hostel administration" },
];