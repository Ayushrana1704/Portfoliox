import { createFileRoute } from "@tanstack/react-router";

import { Backdrop } from "@/components/portfolio/Backdrop";
import { Cursor } from "@/components/portfolio/Cursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Credentials } from "@/components/portfolio/Credentials";
import { Profiles } from "@/components/portfolio/Profiles";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const title = "Ayush Rana — Full Stack Software Developer";
const description =
  "Portfolio of Ayush Rana, full stack software developer building scalable web applications and AI-powered platforms with React, TypeScript, FastAPI and PostgreSQL.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Backdrop />
      <Cursor />
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-[0.68rem] focus:uppercase focus:tracking-[0.16em] focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Credentials />
        <Profiles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
