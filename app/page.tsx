"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { BlurIn } from "@/components/ui/blur-in";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

// ─── COUNT UP ─────────────────────────────────────────────────────────────────

function CountUp({
  end,
  suffix,
  duration = 1800,
  started,
}: {
  end: number;
  suffix: string;
  duration?: number;
  started: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for a fast-start, slow-finish feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(end);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Work", "Services", "Tech", "Contact"];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: "var(--h-height)",
        borderBottom: scrolled ? "1px solid var(--clr-border)" : "1px solid transparent",
        background: scrolled ? "rgba(225,215,201,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
    >
      <div
        className="flex items-center justify-between h-full"
        style={{ paddingInline: "var(--pad-x)" }}
      >
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="Marrero Web Studio"
            style={{ height: "110px", width: "auto" }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={link === "Contact" ? "/contact" : `#${link.toLowerCase()}`}
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                color: "var(--clr-text-2)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                transition: "color var(--transition-1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-text-2)")}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="/contact"
          className="hidden md:inline-flex items-center gap-2"
          style={{
            fontFamily: "var(--ff-1)",
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            background: "var(--clr-green)",
            color: "var(--clr-black)",
            padding: "0.6em 1.4em",
            transition: "opacity var(--transition-1)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Start a Project
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "1.5rem",
                height: "1.5px",
                background: "var(--clr-white)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform:
                  menuOpen && i === 0
                    ? "translateY(7.5px) rotate(45deg)"
                    : menuOpen && i === 2
                      ? "translateY(-7.5px) rotate(-45deg)"
                      : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            style={{
              overflow: "hidden",
              background: "var(--clr-light-black)",
              borderBottom: "1px solid var(--clr-border)",
            }}
          >
            <div
              className="flex flex-col py-6"
              style={{ paddingInline: "var(--pad-x)", gap: "1.25rem" }}
            >
              {links.map((link) => (
                <a
                  key={link}
                  href={link === "Contact" ? "/contact" : `#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--ff-2)",
                    fontSize: "var(--h4)",
                    color: "var(--clr-white)",
                    textTransform: "uppercase",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const headline = ["WEB.", "APP.", "CODE.", "CRAFT."];

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "var(--clr-black)",
        paddingBottom: "var(--sp-lg)",
        paddingTop: "var(--h-height)",
      }}
    >
      {/* Animated grid — scrolls + reveals on mouse hover */}
      <InfiniteGrid className="absolute inset-0 pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(121,243,182,0.07) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div style={{ paddingInline: "var(--pad-x)" }}>
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3"
          style={{ marginBottom: "1.5rem" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--clr-green)",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Full Stack Developer — Available for Work
          </span>
        </motion.div>

        {/* Big headline */}
        <h1
          style={{
            fontFamily: "var(--ff-2)",
            fontSize: "var(--caption-l)",
            lineHeight: "0.88",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: "var(--sp-sm)",
          }}
        >
          {headline.map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.span
                style={{
                  display: "inline-block",
                  color: i === headline.length - 1 ? "var(--clr-green)" : "var(--clr-white)",
                }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.35 + i * 0.11,
                  ease: [0.65, 0, 0.35, 1],
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.p
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-sm)",
              color: "var(--clr-text)",
              lineHeight: "1.65",
              maxWidth: "38ch",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            I build performant, scalable web applications — from pixel-perfect frontends to robust
            backend systems. Based in the US, shipping worldwide.
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                background: "var(--clr-green)",
                color: "var(--clr-black)",
                padding: "0.85em 2em",
                transition: "gap var(--transition-1), opacity var(--transition-1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="/contact"
              className="group relative inline-flex items-center justify-start overflow-hidden"
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                border: "1px solid var(--clr-border)",
                padding: "0.85em 2em",
                textDecoration: "none",
              }}
            >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#9AB55C] absolute bottom-0 left-0 -translate-x-full translate-y-full mb-9 ml-9 ease-out duration-500 transition-[transform,margin] group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0" />
              <span
                className="relative w-full text-left transition-colors duration-300 ease-in-out group-hover:text-[#1C1C1E]"
                style={{ color: "var(--clr-text)" }}
              >
                Contact Me
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating badge top-right */}
      <motion.div
        className="absolute hidden md:flex flex-col gap-3"
        style={{ top: "calc(var(--h-height) + 2rem)", right: "var(--pad-x)" }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div
          style={{
            border: "1px solid var(--clr-border)",
            padding: "1.25rem 1.5rem",
            background: "rgba(225,215,201,0.75)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minWidth: "14rem",
          }}
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--clr-green)",
                display: "block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "0.7rem",
                color: "var(--clr-green)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Available for Work
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "0.72rem",
              color: "var(--clr-text-2)",
              lineHeight: "1.5",
            }}
          >
            Open to full-time &amp; freelance
            <br />
            projects worldwide.
          </p>
        </div>
        <div
          style={{
            border: "1px solid var(--clr-border)",
            padding: "1rem 1.5rem",
            background: "rgba(225,215,201,0.75)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ff-2)",
              fontSize: "var(--h4)",
              color: "var(--clr-white)",
              lineHeight: 1,
            }}
          >
            5+
          </span>
          <span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "0.7rem",
              color: "var(--clr-text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              lineHeight: "1.4",
            }}
          >
            Years of
            <br />
            Experience
          </span>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span
          style={{
            fontFamily: "var(--ff-1)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--clr-text-2)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "3rem",
            background: "linear-gradient(to bottom, var(--clr-green), transparent)",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const statsBarRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsBarRef, { once: true, amount: 0.8 });

  const stats = [
    { end: 5, suffix: "+", label: "Years of Experience" },
    { end: 40, suffix: "+", label: "Projects Delivered" },
    { end: 25, suffix: "+", label: "Happy Clients" },
    { end: 99, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "var(--clr-light-black)", paddingBlock: "var(--sp-xxl)" }}
    >
      <div style={{ paddingInline: "var(--pad-x)" }}>
        {/* Label */}
        <motion.div
          className="flex items-center gap-3"
          style={{ marginBottom: "var(--sp-sm)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--clr-green)",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            About Me
          </span>
        </motion.div>

        {/* Two columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          style={{ marginBottom: "var(--sp-sm)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2
              style={{
                fontFamily: "var(--ff-2)",
                fontSize: "var(--h2)",
                color: "var(--clr-white)",
                lineHeight: "1.05",
                marginBottom: "1.5rem",
              }}
            >
              WE ARE
              <br />
              <span style={{ color: "var(--clr-green)" }}>PROUD</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text)",
                color: "var(--clr-text)",
                lineHeight: "1.7",
                maxWidth: "44ch",
                marginBottom: "2rem",
              }}
            >
              A passionate full-stack developer with a sharp eye for design and a deep love for
              clean, maintainable code. I work across the entire stack — from database schema to
              pixel-perfect UI — to deliver products that perform and delight.
            </p>
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "TypeScript", "Node.js"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--ff-1)",
                    fontSize: "var(--text-xs)",
                    color: "var(--clr-text-2)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    border: "1px solid var(--clr-border)",
                    padding: "0.35em 0.85em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              overflow: "hidden",
              background: "var(--clr-grey)",
            }}
          >
            <img
              src="https://placehold.co/800x600/D4C9B8/1C1C1E?text=Developer+at+Work"
              alt="Developer at work"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(121,243,182,0.08) 0%, transparent 60%), linear-gradient(to bottom, transparent 50%, var(--clr-light-black))",
              }}
            />
          </motion.div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsBarRef}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: "1px solid var(--clr-border)" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              style={{
                paddingBlock: "var(--sp-sm)",
                paddingRight: "var(--sp-xs)",
                paddingLeft: i > 0 ? "var(--sp-xs)" : "0",
                borderRight: i < stats.length - 1 ? "1px solid var(--clr-border)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--ff-2)",
                  fontSize: "var(--h2)",
                  color: "var(--clr-green)",
                  lineHeight: "1",
                  marginBottom: "0.4rem",
                }}
              >
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={1600 + i * 200}
                  started={statsInView}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--ff-1)",
                  fontSize: "var(--text-xs)",
                  color: "var(--clr-text-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WORK ─────────────────────────────────────────────────────────────────────

function Work() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="work"
      ref={ref}
      style={{ background: "var(--clr-black)", overflow: "hidden", paddingBlock: "var(--sp-xxl)" }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ paddingInline: "var(--pad-x)", textAlign: "center", marginBottom: "var(--sp-xl)" }}
      >
        <div className="flex items-center justify-center gap-3">
          <span
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--clr-green)",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Selected Work
          </span>
          <span
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--clr-green)",
              display: "block",
            }}
          />
        </div>
      </motion.div>

      {/* Feature carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ paddingInline: "var(--pad-x)" }}
      >
        <FeatureCarousel />
      </motion.div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    {
      num: "01",
      title: "Website Development",
      desc: "Custom websites built for performance and conversion. Landing pages to complex web apps.",
      tags: ["Next.js", "React", "Tailwind"],
    },
    {
      num: "02",
      title: "Backend Development",
      desc: "Scalable APIs and server-side applications. REST, GraphQL, real-time systems.",
      tags: ["Node.js", "PostgreSQL", "Redis"],
    },
    {
      num: "03",
      title: "UI/UX Design",
      desc: "Interface design combining aesthetics with usability. Figma to code, pixel-perfect delivery.",
      tags: ["Figma", "Prototyping", "Design Systems"],
    },
    {
      num: "04",
      title: "E-Commerce",
      desc: "Full-featured online stores with payment integration, inventory management, and analytics.",
      tags: ["Shopify", "Stripe", "Custom"],
    },
    {
      num: "05",
      title: "Performance Optimization",
      desc: "Speed up your existing app. Core Web Vitals, caching strategies, CDN configuration.",
      tags: ["Lighthouse", "Vercel", "CloudFlare"],
    },
    {
      num: "06",
      title: "SEO & Analytics",
      desc: "Technical SEO implementation and analytics setup to grow your organic reach.",
      tags: ["Schema", "GA4", "Search Console"],
    },
    {
      num: "07",
      title: "Application Development",
      desc: "Full-stack SaaS applications, internal tools, and dashboards built from the ground up.",
      tags: ["React", "Node.js", "AWS"],
    },
    {
      num: "08",
      title: "Consulting",
      desc: "Technical strategy and architecture reviews. Helping you make the right technology choices.",
      tags: ["Architecture", "Code Review", "Strategy"],
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      style={{ background: "var(--clr-light-black)", paddingBlock: "var(--sp-xxl)" }}
    >
      <div style={{ paddingInline: "var(--pad-x)" }}>
        <div className="flex items-center gap-3" style={{ marginBottom: "0.75rem" }}>
          <span
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--clr-green)",
              display: "block",
            }}
          />
          <motion.span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            What I Do
          </motion.span>
        </div>

        <motion.h2
          style={{
            fontFamily: "var(--ff-2)",
            fontSize: "var(--h2)",
            color: "var(--clr-white)",
            marginBottom: "var(--sp-md)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          SERVICES
        </motion.h2>

        <div style={{ borderTop: "1px solid var(--clr-border)" }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.055 }}
              className="group"
              style={{
                display: "grid",
                gridTemplateColumns: "2.5rem 1fr",
                gap: "0 clamp(1rem, 3vw, 2.5rem)",
                alignItems: "start",
                paddingBlock: "clamp(1rem, 2vw, 1.5rem)",
                borderBottom: "1px solid var(--clr-border)",
                cursor: "default",
                transition: "background var(--transition-1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(121,243,182,0.025)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span
                style={{
                  fontFamily: "var(--ff-1)",
                  fontSize: "var(--text-xs)",
                  color: "var(--clr-green)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  paddingTop: "0.2em",
                }}
              >
                {svc.num}
              </span>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                <h3
                  style={{
                    fontFamily: "var(--ff-2)",
                    fontSize: "var(--h5)",
                    color: "var(--clr-white)",
                    flex: "0 0 auto",
                    minWidth: "min(17rem, 100%)",
                    transition: "color var(--transition-1)",
                  }}
                  className="group-hover:text-[#9AB55C]"
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--ff-1)",
                    fontSize: "var(--text-xs)",
                    color: "var(--clr-text)",
                    lineHeight: "1.55",
                    flex: 1,
                  }}
                >
                  {svc.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 md:justify-end">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--ff-1)",
                        fontSize: "0.65rem",
                        color: "var(--clr-text-2)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        border: "1px solid var(--clr-border)",
                        padding: "0.25em 0.6em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    color: "var(--clr-green)",
                    fontSize: "1.2rem",
                    display: "none",
                    transition: "transform var(--transition-1)",
                  }}
                  className="md:block group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CLIENTS ──────────────────────────────────────────────────────────────────

function Clients() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const clients = [
    "Acme Corp",
    "FinTech Co",
    "MediaHouse",
    "RetailBrand",
    "HealthTech",
    "EduPlatform",
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "var(--clr-black)",
        paddingBlock: "var(--sp-xl)",
        borderTop: "1px solid var(--clr-border)",
        borderBottom: "1px solid var(--clr-border)",
      }}
    >
      <div style={{ paddingInline: "var(--pad-x)" }}>
        <motion.div
          className="flex items-center gap-3"
          style={{ marginBottom: "var(--sp-sm)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--clr-green)",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            JOIN THE BEST
          </span>
        </motion.div>

        <div
          className="grid grid-cols-2 md:grid-cols-6"
          style={{ gap: "1px", background: "var(--clr-border)" }}
        >
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                background: "var(--clr-black)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                transition: "background var(--transition-1)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(121,243,182,0.04)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--clr-black)")
              }
            >
              <span
                style={{
                  fontFamily: "var(--ff-2)",
                  fontSize: "var(--text-xs)",
                  color: "var(--clr-text-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                }}
              >
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TECHNOLOGIES ─────────────────────────────────────────────────────────────

function Technologies() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const techGroups = [
    {
      label: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    },
    {
      label: "Backend",
      items: ["Node.js", "Express", "NestJS", "GraphQL", "REST APIs", "WebSockets"],
    },
    {
      label: "Database",
      items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase", "PlanetScale"],
    },
    {
      label: "DevOps",
      items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare", "Nginx"],
    },
  ];

  return (
    <section
      id="tech"
      ref={ref}
      style={{ background: "var(--clr-light-black)", paddingBlock: "var(--sp-xxl)" }}
    >
      <div style={{ paddingInline: "var(--pad-x)" }}>
        <div className="flex items-center gap-3" style={{ marginBottom: "0.75rem" }}>
          <span
            style={{
              width: "2rem",
              height: "1px",
              background: "var(--clr-green)",
              display: "block",
            }}
          />
          <motion.span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Stack
          </motion.span>
        </div>

        <motion.h2
          style={{
            fontFamily: "var(--ff-2)",
            fontSize: "var(--h2)",
            color: "var(--clr-white)",
            marginBottom: "var(--sp-lg)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          OUR TECHNOLOGIES
        </motion.h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          style={{ gap: "1px", background: "var(--clr-border)" }}
        >
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              style={{
                background: "var(--clr-light-black)",
                padding: "var(--sp-sm)",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--ff-1)",
                  fontSize: "var(--text-xs)",
                  color: "var(--clr-green)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "1.5rem",
                }}
              >
                {group.label}
              </h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {group.items.map((item, ii) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: gi * 0.1 + ii * 0.05 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      paddingBlock: "0.75rem",
                      borderBottom: "1px solid var(--clr-border)",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "var(--clr-green)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--ff-1)",
                        fontSize: "var(--text-sm)",
                        color: "var(--clr-text)",
                      }}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What types of projects do you work on?",
      a: "I specialize in web applications, SaaS products, e-commerce platforms, and corporate websites. If it involves code and a browser, I'm likely interested.",
    },
    {
      q: "How long does a typical project take?",
      a: "A landing page typically takes 1–2 weeks. A full web application is usually 4–12 weeks depending on complexity. I always provide a detailed timeline upfront.",
    },
    {
      q: "Do you work with existing codebases?",
      a: "Absolutely. I'm experienced with legacy refactoring, performance optimization, and feature development on existing applications. I'll review your code and provide a clear plan.",
    },
    {
      q: "What is your pricing model?",
      a: "I offer both project-based and hourly engagements. For larger projects, I provide a detailed quote after an initial discovery call — no surprises.",
    },
    {
      q: "Do you provide post-launch support?",
      a: "Yes. I offer maintenance packages and dedicated support plans. You won't be left stranded after launch day.",
    },
    {
      q: "How do we start working together?",
      a: "Send me a message through the contact form or email directly. I'll respond within 24 hours to schedule a discovery call and discuss your project.",
    },
  ];

  return (
    <section ref={ref} style={{ background: "var(--clr-black)", paddingBlock: "var(--sp-xxl)" }}>
      <div style={{ paddingInline: "var(--pad-x)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(2rem, 6vw, 6rem)" }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "var(--clr-green)",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--ff-1)",
                  fontSize: "var(--text-xs)",
                  color: "var(--clr-text-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                FAQ
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--ff-2)",
                fontSize: "var(--h2)",
                color: "var(--clr-white)",
                lineHeight: "1.05",
              }}
            >
              FREQUENTLY
              <br />
              ASKED
              <br />
              QUESTIONS
              <br />
              <span style={{ color: "var(--clr-green)" }}>&amp; ANSWERS</span>
            </h2>
          </motion.div>

          {/* Right — Accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ borderBottom: "1px solid var(--clr-border)" }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    textAlign: "left",
                    paddingBlock: "var(--sp-xxs)",
                    fontFamily: "var(--ff-2)",
                    fontSize: "var(--h6)",
                    textTransform: "uppercase",
                    color: openIndex === i ? "var(--clr-white)" : "var(--clr-text)",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "color var(--transition-1)",
                  }}
                >
                  {faq.q}
                  <span
                    style={{
                      flexShrink: 0,
                      width: "2rem",
                      height: "2rem",
                      border: "1px solid var(--clr-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: openIndex === i ? "var(--clr-green)" : "var(--clr-text-2)",
                      fontSize: "1.2rem",
                      fontFamily: "monospace",
                      transform: openIndex === i ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s ease, color var(--transition-1)",
                    }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--ff-1)",
                          fontSize: "var(--text-sm)",
                          color: "var(--clr-text)",
                          lineHeight: "1.7",
                          paddingBottom: "var(--sp-xxs)",
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "var(--clr-light-black)",
        paddingBlock: "var(--sp-xxl)",
        borderTop: "1px solid var(--clr-border)",
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
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(121,243,182,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ paddingInline: "var(--pad-x)", textAlign: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div
            className="flex items-center justify-center gap-3"
            style={{ marginBottom: "1.5rem" }}
          >
            <span
              style={{
                width: "2rem",
                height: "1px",
                background: "var(--clr-green)",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                color: "var(--clr-text-2)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Contact
            </span>
            <span
              style={{
                width: "2rem",
                height: "1px",
                background: "var(--clr-green)",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              fontFamily: "var(--ff-2)",
              fontSize: "var(--caption-m)",
              lineHeight: "0.9",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            <BlurIn
              word="LET'S"
              triggered={inView}
              duration={1.6}
              delay={0}
              className="block"
              variant={{
                hidden: { filter: "blur(14px)", opacity: 0 },
                visible: { filter: "blur(0px)", opacity: 1 },
              }}
              style={{ color: "var(--clr-white)" }}
            />
            <BlurIn
              word="BEGIN"
              triggered={inView}
              duration={1.6}
              delay={0.3}
              className="block"
              variant={{
                hidden: { filter: "blur(14px)", opacity: 0 },
                visible: { filter: "blur(0px)", opacity: 1 },
              }}
              style={{ color: "var(--clr-green)" }}
            />
          </div>

          <p
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text)",
              color: "var(--clr-text)",
              lineHeight: "1.65",
              maxWidth: "44ch",
              margin: "0 auto 2.5rem",
            }}
          >
            Have a project in mind? Let&apos;s talk about how we can work together to build
            something exceptional.
          </p>

          <a
            href="mailto:albert.marrero10@gmail.com"
            className="inline-flex items-center gap-3"
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--btn-m)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "var(--clr-green)",
              color: "var(--clr-black)",
              padding: "0.9em 2.5em",
              transition: "opacity var(--transition-1), gap var(--transition-1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Start a Project
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 9H15M15 9L10 4M15 9L10 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const navLinks = ["About", "Work", "Services", "Technologies", "Contact"];
  const socialLinks = ["GitHub", "LinkedIn", "Twitter / X", "Dribbble"];
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkInView = useInView(wordmarkRef, { once: true, amount: 0.5 });

  return (
    <footer
      style={{
        background: "var(--clr-black)",
        borderTop: "1px solid var(--clr-border)",
      }}
    >
      <div style={{ paddingInline: "var(--pad-x)", paddingTop: "var(--sp-xl)" }}>
        {/* Top row */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          style={{ marginBottom: "var(--sp-xl)" }}
        >
          {/* Brand */}
          <div className="md:col-span-2" style={{ marginTop: "-3rem" }}>
            <div style={{ marginBottom: "0.1rem" }}>
              <img
                src="/logo.png"
                alt="Marrero Web Studio"
                style={{ height: "180px", width: "auto" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                color: "var(--clr-text)",
                lineHeight: "1.65",
                maxWidth: "32ch",
                marginBottom: "1.5rem",
              }}
            >
              Full Stack Web Developer.
              <br />
              Building exceptional digital experiences.
            </p>
            <a
              href="mailto:albert.marrero10@gmail.com"
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                color: "var(--clr-green)",
                textTransform: "lowercase",
                letterSpacing: "0.04em",
                transition: "opacity var(--transition-1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              albert.marrero10@gmail.com
            </a>
          </div>

          {/* Nav */}
          <nav>
            <div
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                color: "var(--clr-green)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Navigation
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{
                      fontFamily: "var(--ff-1)",
                      fontSize: "var(--text-xs)",
                      color: "var(--clr-text-2)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      transition: "color var(--transition-1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-text-2)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <nav>
            <div
              style={{
                fontFamily: "var(--ff-1)",
                fontSize: "var(--text-xs)",
                color: "var(--clr-green)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Social
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {socialLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "var(--ff-1)",
                      fontSize: "var(--text-xs)",
                      color: "var(--clr-text-2)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      transition: "color var(--transition-1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--clr-white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--clr-text-2)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Big footer wordmark */}
        <div
          ref={wordmarkRef}
          style={{
            borderTop: "1px solid var(--clr-border)",
            paddingTop: "1.5rem",
            overflow: "hidden",
          }}
        >
          <GradualSpacing
            text="PORTFOLIO"
            triggered={wordmarkInView}
            duration={0.7}
            delayMultiple={0.06}
            framerProps={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 },
            }}
            style={{
              fontFamily: "var(--ff-2)",
              fontSize: "var(--caption-l)",
              lineHeight: "0.85",
              textTransform: "uppercase",
              color: "rgba(28,28,30,0.18)",
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          />
        </div>

        {/* Copyright */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          style={{
            borderTop: "1px solid var(--clr-border)",
            paddingBlock: "1.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
            }}
          >
            © {new Date().getFullYear()} — All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "var(--ff-1)",
              fontSize: "var(--text-xs)",
              color: "var(--clr-text-2)",
            }}
          >
            Built with Next.js &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Work />
      <Services />
      <Clients />
      <Technologies />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
