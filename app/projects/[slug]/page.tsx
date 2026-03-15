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
  "roses-by-lina": {
    title: "Roses by Lina",
    subtitle: "Luxury floral design studio — built to bloom online",
    year: "2024",
    category: "Web Design & Development",
    heroImage: "/roses-by-lina-logo.jpg",
    overview: {
      left: "Lina needed more than a website — she needed a digital space that matched the care and artistry she puts into every arrangement. The goal was to translate the warmth of a boutique floral studio into a clean, elegant online presence that converts visitors into clients.",
      right:
        "We built a bilingual (English/Spanish) site with a custom inquiry form, an image-forward gallery, and a mobile-first layout that feels as curated as the arrangements themselves. The result is a site that communicates luxury, approachability, and trust at a glance.",
    },
    skills: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
      "Web3Forms",
      "Vercel",
      "Responsive Design",
      "Bilingual UI",
    ],
    siteImage:
      "https://images.unsplash.com/photo-1490750967868-88df5691cc11?q=80&w=1600",
    wordmark: "FLORAL",
    stats: [
      { value: "100", label: "PageSpeed Score" },
      { value: "2", label: "Languages Supported" },
      { value: "24h", label: "Inquiry Response Time" },
    ],
    brandGuide: {
      colors: [
        { hex: "#C7A452", name: "Gold" },
        { hex: "#FEFEFE", name: "Pearl" },
        { hex: "#141616", name: "Midnight" },
      ],
      fontHeading: "Playfair Display",
      fontBody: "Montserrat",
      fontHeadingDesc:
        "Elegant serif chosen for its romantic, editorial quality — sets a tone of luxury and timelessness.",
      fontBodyDesc:
        "Clean geometric sans-serif that pairs with Playfair to keep the UI approachable and easy to scan.",
    },
    mockupImages: [
      "https://images.unsplash.com/photo-1558618047-f94aad81ce9b?q=80&w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800",
    ],
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel", "Bilingual"],
    url: "https://roses-by-lina.vercel.app/",
  },
};

const FALLBACK = PROJECTS.ecommerce;

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
  const clrTitle = "var(--clr-title)";
  const clrText = "var(--clr-text)";
  const clrText2 = "var(--clr-text-2)";
  const border = "1px solid var(--clr-border)";
  const ff1 = "var(--ff-1)";
  const ff2 = "var(--ff-2)";

  return (
    <div
      style={{
        background: bg,
        minHeight: "100vh",
        fontFamily: ff1,
        color: clrText,
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
          background: "rgba(225,215,201,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: border,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Marrero Web Studio" style={{ height: "54px", width: "auto" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link
            href="/#work"
            style={{
              fontFamily: ff1,
              fontSize: "0.72rem",
              color: clrText2,
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
                background: "var(--clr-border)",
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: clrText2,
                fontFamily: ff2,
              }}
            >
              {project.category} · {project.year}
            </span>
            <span
              style={{
                width: "1.5rem",
                height: "1px",
                background: "var(--clr-border)",
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
              color: clrTitle,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: clrText2,
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
                  color: clrText2,
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
              borderRadius: slug === "roses-by-lina" ? "0" : "1.25rem",
              overflow: slug === "roses-by-lina" ? "visible" : "hidden",
              border: slug === "roses-by-lina" ? "none" : border,
              aspectRatio: "16/9",
              display: slug === "roses-by-lina" ? "flex" : "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={project.heroImage}
              alt={project.title}
              style={
                slug === "roses-by-lina"
                  ? { maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", borderRadius: "1.5rem" }
                  : { width: "100%", height: "100%", objectFit: "cover" }
              }
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
                  color: clrText,
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
                  color: clrText,
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
                  color: clrText2,
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
                      background: "rgba(154,181,92,0.12)",
                      border: "1px solid rgba(154,181,92,0.35)",
                      color: "var(--clr-dark-green)",
                      borderRadius: "0",
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
              boxShadow: "0 40px 100px rgba(28,28,30,0.15)",
              maxWidth: "1200px",
              margin: "0 auto",
              aspectRatio: "16/9",
            }}
          >
            {slug === "roses-by-lina" ? (
              <video
                src="/Roses-by-Lina-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img
                src={project.siteImage}
                alt={`${project.title} screenshot`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
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
                color: clrTitle,
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
                  color: clrText,
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
                  color: clrText,
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
                color: clrText2,
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
                      color: clrText,
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
                      color: clrText2,
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
                color: clrText2,
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
                    background: "rgba(28,28,30,0.05)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: ff2,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: clrText2,
                      marginBottom: "0.9rem",
                    }}
                  >
                    {role}
                  </p>
                  <p
                    style={{
                      fontFamily: ff2,
                      fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                      color: clrTitle,
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
                      color: clrText,
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
              "radial-gradient(ellipse at center, rgba(154,181,92,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <FadeIn>
          <p
            style={{
              fontFamily: ff2,
              fontSize: "1rem",
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
              color: clrTitle,
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}
          >
            Ready to bring
            <br />
            <span style={{ color: "var(--clr-dark-green)" }}>
              your ideas to life?
            </span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: clrText2,
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
                color: "var(--clr-white)",
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
              className="group relative inline-flex items-center justify-start overflow-hidden"
              style={{
                fontFamily: ff2,
                fontSize: "0.72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                background: "transparent",
                border: border,
                padding: "1em 2.5em",
                textDecoration: "none",
              }}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#9AB55C] absolute bottom-0 left-0 -translate-x-full translate-y-full mb-9 ml-9 ease-out duration-500 transition-[transform,margin] group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0" />
              <span
                className="relative w-full text-left transition-colors duration-300 ease-in-out group-hover:text-[#1C1C1E]"
                style={{ color: clrText2 }}
              >
                View More Work
              </span>
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
        <img src="/logo.png" alt="Marrero Web Studio" style={{ height: "32px", width: "auto" }} />
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
                color: clrText2,
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
            color: clrText2,
            letterSpacing: "0.06em",
          }}
        >
          © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
