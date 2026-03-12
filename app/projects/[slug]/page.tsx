"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────

const PROJECTS: Record<
  string,
  {
    title: string;
    subtitle: string;
    year: string;
    category: string;
    heroImage: string;
    overview: { left: string; right: string };
    skills: string[];
    siteImage: string;
    wordmark: string;
    stats: { value: string; label: string }[];
    brandGuide: {
      colors: { hex: string; name: string }[];
      fontHeading: string;
      fontBody: string;
      fontHeadingDesc: string;
      fontBodyDesc: string;
    };
    mockupImages: string[];
    tags: string[];
    url: string;
  }
> = {
  ecommerce: {
    title: "E-Commerce Platform",
    subtitle: "Full-featured online store built for scale",
    year: "2024",
    category: "Web Development",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600",
    overview: {
      left: "A complete e-commerce solution designed for a fast-growing retail brand. The brief called for a seamless shopping experience that could handle high traffic while maintaining a premium feel throughout the purchase journey.",
      right:
        "We delivered a Next.js storefront with real-time inventory sync, Stripe payment processing, and a custom admin dashboard. The result: a 40% increase in conversion rate and a 60% reduction in cart abandonment within the first quarter.",
    },
    skills: [
      "Next.js",
      "TypeScript",
      "Stripe API",
      "PostgreSQL",
      "Tailwind CSS",
      "Prisma ORM",
      "Redis",
      "Vercel",
    ],
    siteImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600",
    wordmark: "COMMERCE",
    stats: [
      { value: "40%", label: "Conversion Rate Increase" },
      { value: "60%", label: "Cart Abandonment Reduction" },
      { value: "2.1s", label: "Average Page Load" },
    ],
    brandGuide: {
      colors: [
        { hex: "#0A0A0A", name: "Obsidian" },
        { hex: "#F5F0EB", name: "Cream" },
        { hex: "#C8A97E", name: "Gold" },
        { hex: "#3D3530", name: "Walnut" },
        { hex: "#E8E0D5", name: "Linen" },
      ],
      fontHeading: "Playfair Display",
      fontBody: "DM Sans",
      fontHeadingDesc:
        "Elegant serif for headlines, conveying trust and premium quality.",
      fontBodyDesc:
        "Clean geometric sans-serif for body text, ensuring readability at scale.",
    },
    mockupImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800",
    ],
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    url: "#",
  },
  saas: {
    title: "SaaS Dashboard",
    subtitle: "Real-time analytics for a Series A fintech",
    year: "2024",
    category: "Product Design & Development",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1600",
    overview: {
      left: "A Series A fintech startup needed a data visualization platform that could surface insights across millions of transactions without overwhelming their non-technical users.",
      right:
        "We built a real-time dashboard with customizable widgets, role-based access controls, and automated reporting. The platform now serves 50+ enterprise clients and processes over 2M daily events.",
    },
    skills: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "D3.js",
      "Docker",
      "AWS",
    ],
    siteImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600",
    wordmark: "ANALYTICS",
    stats: [
      { value: "50+", label: "Enterprise Clients" },
      { value: "2M+", label: "Daily Events Processed" },
      { value: "99.9%", label: "Uptime SLA" },
    ],
    brandGuide: {
      colors: [
        { hex: "#0F1729", name: "Navy" },
        { hex: "#1E3A5F", name: "Ocean" },
        { hex: "#3B82F6", name: "Sapphire" },
        { hex: "#F8FAFC", name: "Frost" },
        { hex: "#64748B", name: "Slate" },
      ],
      fontHeading: "Inter",
      fontBody: "IBM Plex Mono",
      fontHeadingDesc:
        "Neutral, data-focused sans-serif for clarity in complex interfaces.",
      fontBodyDesc:
        "Monospace for data density, code references, and technical precision.",
    },
    mockupImages: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=800",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "WebSockets"],
    url: "#",
  },
  agency: {
    title: "Agency Website",
    subtitle: "Award-nominated site with immersive scroll",
    year: "2023",
    category: "Creative Development",
    heroImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600",
    overview: {
      left: "A boutique creative agency needed a digital presence that matched the quality of their output — something that would stop potential clients mid-scroll and compel them to reach out.",
      right:
        "We delivered an immersive experience built on Next.js with GSAP-powered scroll animations, a headless CMS for easy content updates, and a custom cursor system that responds to context throughout the site.",
    },
    skills: [
      "Next.js",
      "GSAP",
      "Sanity CMS",
      "Tailwind CSS",
      "TypeScript",
      "Three.js",
    ],
    siteImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1600",
    wordmark: "CREATIVE",
    stats: [
      { value: "3×", label: "Increase in Inbound Leads" },
      { value: "8min", label: "Average Session Duration" },
      { value: "92", label: "PageSpeed Score" },
    ],
    brandGuide: {
      colors: [
        { hex: "#1A1A1A", name: "Charcoal" },
        { hex: "#FF4D1C", name: "Flame" },
        { hex: "#F5F5F0", name: "Ivory" },
        { hex: "#8B5CF6", name: "Violet" },
        { hex: "#D4D0C8", name: "Stone" },
      ],
      fontHeading: "Syne",
      fontBody: "Onest",
      fontHeadingDesc:
        "Geometric, variable-weight display font for bold editorial presence.",
      fontBodyDesc:
        "Modern, legible sans-serif with personality for long-form reading.",
    },
    mockupImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
    ],
    tags: ["Next.js", "GSAP", "Sanity CMS", "Tailwind CSS"],
    url: "#",
  },
};

const FALLBACK = PROJECTS.agency;

// ─── FADE IN ──────────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS[slug] ?? FALLBACK;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const bg = "var(--clr-black)";
  const bgAlt = "var(--clr-light-black)";
  const clrGreen = "var(--clr-green)";
  const clrWhite = "var(--clr-white)";
  const border = "1px solid var(--clr-border)";
  const ff1 = "var(--ff-1)";
  const ff2 = "var(--ff-2)";

  return (
    <div
      style={{
        background: bg,
        minHeight: "100vh",
        fontFamily: ff1,
        color: clrWhite,
      }}
    >
      <style>{`
        .overview-grid {
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1.1fr);
          gap: clamp(2rem, 6vw, 6rem);
          align-items: start;
          max-width: 1600px;
          margin: 0 auto;
        }
        @media (max-width: 860px) {
          .overview-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .overview-label {
            white-space: normal !important;
            font-size: clamp(1.4rem, 6vw, 2rem) !important;
          }
        }
      `}</style>
      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem clamp(1.5rem, 5vw, 4rem)",
          background: "rgba(2,2,2,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: border,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: ff2,
            fontSize: "0.85rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: clrWhite,
            textDecoration: "none",
          }}
        >
          AM<span style={{ color: clrGreen }}>.</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link
            href="/#work"
            style={{
              fontFamily: ff1,
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            ← All Projects
          </Link>
          {project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: ff1,
                fontSize: "0.72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                background: clrGreen,
                color: "var(--clr-black)",
                padding: "0.55em 1.3em",
                textDecoration: "none",
              }}
            >
              Visit Site ↗
            </a>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          paddingTop: "calc(4.5rem + 64px)",
          paddingBottom: "4rem",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: "1.5rem",
                height: "1px",
                background: "rgba(255,255,255,0.2)",
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                fontFamily: ff2,
              }}
            >
              {project.category} · {project.year}
            </span>
            <span
              style={{
                width: "1.5rem",
                height: "1px",
                background: "rgba(255,255,255,0.2)",
                display: "block",
              }}
            />
          </div>
          <h1
            style={{
              fontFamily: ff2,
              fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              color: clrWhite,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "40ch",
              margin: "0 auto 2.5rem",
              lineHeight: 1.65,
            }}
          >
            {project.subtitle}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
              marginBottom: "3.5rem",
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: border,
                  padding: "0.3em 0.85em",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: ff2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: border,
              aspectRatio: "16/9",
            }}
          >
            <img
              src={project.heroImage}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </FadeIn>
      </section>

      {/* ── OVERVIEW ── */}
      <section
        style={{
          paddingBlock: "6rem",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          background: bgAlt,
          borderTop: border,
          borderBottom: border,
        }}
      >
        <div className="overview-grid">
          {/* Left — label */}
          <FadeIn>
            <p
              className="overview-label"
              style={{
                fontFamily: ff2,
                fontSize: "clamp(1.8rem, 2.7vw, 2.7rem)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: clrGreen,
                paddingTop: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              Project Overview
            </p>
          </FadeIn>

          {/* Right — paragraphs + skills */}
          <div>
            <FadeIn delay={0.08}>
              <p
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "1.75rem",
                }}
              >
                {project.overview.left}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "4.5rem",
                }}
              >
                {project.overview.right}
              </p>
            </FadeIn>

            {/* Skills */}
            <FadeIn delay={0.22}>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontFamily: ff2,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "1rem",
                }}
              >
                Skills Performed
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: ff2,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "0.5em 1.2em",
                      background: "rgba(121,243,182,0.08)",
                      border: "1px solid rgba(121,243,182,0.2)",
                      color: clrGreen,
                      borderRadius: "9999px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SITE SCREENSHOT ── */}
      <section
        style={{
          paddingBlock: "5rem",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <FadeIn>
          <div
            style={{
              borderRadius: "1.5rem",
              overflow: "hidden",
              border: border,
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              maxWidth: "1200px",
              margin: "0 auto",
              aspectRatio: "16/9",
            }}
          >
            <img
              src={project.siteImage}
              alt={`${project.title} screenshot`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </FadeIn>
      </section>

      {/* ── BRANDING GUIDE ── */}
      <section
        style={{
          paddingBlock: "6rem",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          background: bgAlt,
          borderTop: border,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header + design intro */}
          <FadeIn>
            <p
              style={{
                fontFamily: ff2,
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: clrGreen,
                marginBottom: "0.9rem",
              }}
            >
              Branding Guide
            </p>
            <h2
              style={{
                fontFamily: ff2,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: clrWhite,
                marginBottom: "2rem",
                lineHeight: 1.05,
              }}
            >
              Visual Identity System
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                marginBottom: "4rem",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                The visual direction draws from the intersection of precision
                and warmth — a deliberate tension between structured,
                high-contrast typographic systems and a color palette that feels
                tactile and considered. Every choice was made to signal
                credibility without coldness.
              </p>
              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Inspiration came from archival print design and editorial
                fashion — spaces where restraint and bold decision-making
                coexist. The result is a brand language that communicates at
                speed: instantly readable, unmistakably distinct, and built to
                scale across digital and physical touchpoints.
              </p>
            </div>
          </FadeIn>

          {/* Color palette */}
          <FadeIn delay={0.08}>
            <p
              style={{
                fontFamily: ff2,
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              Color Palette
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "4rem",
              }}
            >
              {project.brandGuide.colors.map(({ hex, name }) => (
                <div
                  key={hex}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    alignItems: "center",
                    width: "120px",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "1rem",
                      background: hex,
                      border: border,
                      boxShadow: `0 8px 32px ${hex}33`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: ff2,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.6)",
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontFamily: ff2,
                      letterSpacing: "0.04em",
                      color: "rgba(255,255,255,0.3)",
                      textAlign: "center",
                    }}
                  >
                    {hex}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Typography */}
          <FadeIn delay={0.16}>
            <p
              style={{
                fontFamily: ff2,
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              Typography
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  role: "Heading",
                  font: project.brandGuide.fontHeading,
                  desc: project.brandGuide.fontHeadingDesc,
                },
                {
                  role: "Body",
                  font: project.brandGuide.fontBody,
                  desc: project.brandGuide.fontBodyDesc,
                },
              ].map(({ role, font, desc }) => (
                <div
                  key={role}
                  style={{
                    padding: "2.5rem",
                    border: border,
                    borderRadius: "1rem",
                    background: "rgba(255,255,255,0.025)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: ff2,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: "0.9rem",
                    }}
                  >
                    {role}
                  </p>
                  <p
                    style={{
                      fontFamily: ff2,
                      fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                      color: clrWhite,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.75rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {font}
                  </p>
                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          paddingBlock: "clamp(6rem, 14vw, 12rem)",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
          background: bgAlt,
          borderTop: border,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse at center, rgba(121,243,182,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <FadeIn>
          <p
            style={{
              fontFamily: ff2,
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: clrGreen,
              marginBottom: "2rem",
            }}
          >
            Start Something New
          </p>
          <h2
            style={{
              fontFamily: ff2,
              fontSize: "clamp(2.4rem, 7vw, 6rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: clrWhite,
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}
          >
            Ready to bring
            <br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>
              your ideas to life?
            </span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "44ch",
              margin: "0 auto 3.5rem",
              lineHeight: 1.7,
            }}
          >
            Have a project in mind? Let's talk about how we can bring it to life
            — from concept to launch.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: ff2,
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: clrGreen,
                color: "var(--clr-black)",
                padding: "1em 2.5em",
                textDecoration: "none",
              }}
            >
              Get in Touch
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 11L11 2M11 2H4M11 2V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/#work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: ff2,
                fontSize: "0.72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "transparent",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "1em 2.5em",
                textDecoration: "none",
              }}
            >
              View More Work
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          paddingBlock: "2rem",
          paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          borderTop: border,
          background: bg,
        }}
      >
        <span
          style={{
            fontFamily: ff2,
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          AM<span style={{ color: clrGreen }}>.</span>
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["About", "Work", "Services", "Contact"].map((link) => (
            <Link
              key={link}
              href={`/#${link.toLowerCase()}`}
              style={{
                fontSize: "0.65rem",
                fontFamily: ff2,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
              }}
            >
              {link}
            </Link>
          ))}
        </div>
        <span
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
