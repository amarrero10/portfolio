"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ff1 = "var(--ff-1)";
const ff2 = "var(--ff-2)";
const clrGreen = "var(--clr-green)";
const clrDarkGreen = "var(--clr-dark-green)";
const clrTitle = "var(--clr-title)";
const clrText = "var(--clr-text)";
const clrText2 = "var(--clr-text-2)";
const clrBorder = "var(--clr-border)";
const clrBlack = "var(--clr-black)";
const clrLightBlack = "var(--clr-light-black)";
const clrWhite = "var(--clr-white)";

// ─── FADE IN ──────────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  return (
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
        borderBottom: `1px solid ${clrBorder}`,
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <img src="/logo.png" alt="Marrero Web Studio" style={{ height: "54px", width: "auto" }} />
      </Link>
      <Link
        href="/"
        style={{
          fontFamily: ff1,
          fontSize: "0.72rem",
          color: clrText2,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = clrWhite)}
        onMouseLeave={(e) => (e.currentTarget.style.color = clrText2)}
      >
        ← Back to Home
      </Link>
    </nav>
  );
}

// ─── CONTACT INFO ITEM ────────────────────────────────────────────────────────

function InfoItem({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <span
        style={{
          fontFamily: ff2,
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: clrGreen,
          display: "block",
          marginBottom: "0.35rem",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: ff1,
          fontSize: "0.95rem",
          color: clrTitle,
          display: "block",
        }}
      >
        {value}
      </span>
    </>
  );

  const sharedStyle: React.CSSProperties = {
    display: "block",
    paddingBottom: "1.5rem",
    borderBottom: `1px solid ${clrBorder}`,
    textDecoration: "none",
  };

  return href ? (
    <a
      href={href}
      style={sharedStyle}
      onMouseEnter={(e) => ((e.currentTarget.querySelector("span:last-child") as HTMLElement).style.color = clrDarkGreen)}
      onMouseLeave={(e) => ((e.currentTarget.querySelector("span:last-child") as HTMLElement).style.color = clrTitle)}
    >
      {content}
    </a>
  ) : (
    <div style={sharedStyle}>{content}</div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wordElements = document.querySelectorAll<HTMLElement>(".contact-word-animate");
    wordElements.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0");
      setTimeout(() => {
        word.style.animation = "contact-word-appear 0.8s ease-out forwards";
      }, delay);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "fa7aa4f6-eba6-4a88-b8f7-6505026057af",
          name: fields.name,
          email: fields.email,
          company: fields.company || "—",
          budget: fields.budget || "—",
          message: fields.message,
          subject: `New project inquiry from ${fields.name}`,
        }),
      });

      if (res.ok) {
        setFormState("success");
        setFields({ name: "", email: "", company: "", budget: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: focused === name ? clrBlack : "rgba(225,215,201,0.4)",
    border: `1px solid ${focused === name ? "rgba(154,181,92,0.6)" : clrBorder}`,
    borderRadius: 0,
    padding: "0.9em 1.1em",
    fontFamily: ff1,
    fontSize: "0.9rem",
    color: clrTitle,
    outline: "none",
    transition: "background 0.25s ease, border-color 0.25s ease",
    display: "block",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: ff2,
    fontSize: "0.62rem",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: clrText2,
    marginBottom: "0.5rem",
  };

  const budgetOptions = [
    "Under $2,000",
    "$2,000 – $5,000",
    "$5,000 – $10,000",
    "$10,000 – $25,000",
    "$25,000+",
    "Not sure yet",
  ];

  return (
    <div style={{ background: clrBlack, minHeight: "100vh", color: clrText }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          paddingTop: "calc(var(--h-height) + 5rem)",
          paddingBottom: "var(--sp-lg)",
          paddingInline: "var(--pad-x)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "72rem", marginInline: "auto" }}>
          {/* Label */}
          <p
            style={{
              fontFamily: ff2,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "rgba(15,100,36,0.75)",
              marginBottom: "1.5rem",
            }}
          >
            {["Let's", "Work", "Together"].map((word, i) => (
              <span
                key={word}
                className="contact-word-animate"
                data-delay={String(i * 150)}
                style={{ marginRight: "0.35em" }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: ff2,
              fontSize: "var(--h1)",
              fontWeight: 600,
              color: clrTitle,
              textTransform: "uppercase",
              lineHeight: "0.95",
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
              maxWidth: "18ch",
            }}
          >
            {["Start", "a", "Project"].map((word, i) => (
              <span
                key={word + i}
                className="contact-word-animate"
                data-delay={String(350 + i * 180)}
                style={{ marginRight: "0.25em" }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 1.1 }}
            style={{
              height: "1px",
              background: `linear-gradient(to right, ${clrGreen}, transparent)`,
              marginBottom: "2rem",
              maxWidth: "32rem",
            }}
          />

          <p
            style={{
              fontFamily: ff1,
              fontSize: "var(--text-sm)",
              color: clrText,
              lineHeight: "1.7",
              maxWidth: "48ch",
            }}
          >
            {["Have", "a", "project", "in", "mind?", "Tell", "me", "about", "it.", "I'll", "get", "back", "to", "you", "within", "24", "hours", "to", "discuss", "how", "we", "can", "bring", "your", "vision", "to", "life."].map((word, i) => (
              <span
                key={word + i}
                className="contact-word-animate"
                data-delay={String(950 + i * 60)}
                style={{ marginRight: "0.28em" }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingInline: "var(--pad-x)",
          paddingBottom: "var(--sp-xxl)",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24"
          style={{ maxWidth: "72rem", marginInline: "auto" }}
        >
          {/* ── LEFT: contact info ─────────────────────────────────────── */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Section label */}
              <p
                style={{
                  fontFamily: ff2,
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: clrText2,
                  paddingBottom: "1rem",
                  borderBottom: `1px solid ${clrBorder}`,
                }}
              >
                Contact Details
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                <InfoItem
                  label="Email"
                  value="albert.marrero10@gmail.com"
                  href="mailto:albert.marrero10@gmail.com"
                />
                <InfoItem label="Location" value="Available Worldwide" />
                <InfoItem label="Response Time" value="Within 24 hours" />
                <InfoItem label="Status" value="Open for new projects" />
              </div>

              {/* Availability badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.65em 1.2em",
                  border: `1px solid rgba(154,181,92,0.35)`,
                  background: "rgba(154,181,92,0.08)",
                  marginTop: "0.5rem",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: clrGreen,
                    boxShadow: `0 0 8px ${clrGreen}`,
                    flexShrink: 0,
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: ff2,
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: clrDarkGreen,
                  }}
                >
                  Currently Available
                </span>
              </div>

              {/* Social links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                {[
                  { label: "LinkedIn", href: "#" },
                  { label: "GitHub", href: "#" },
                  { label: "Twitter / X", href: "#" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: ff1,
                      fontSize: "0.82rem",
                      color: clrText2,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = clrWhite)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = clrText2)}
                  >
                    <span style={{ color: clrGreen, fontSize: "0.7rem" }}>↗</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── RIGHT: form ────────────────────────────────────────────── */}
          <FadeIn delay={0.2}>
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "480px",
                    textAlign: "center",
                    gap: "1.5rem",
                    border: `1px solid rgba(154,181,92,0.3)`,
                    background: "rgba(154,181,92,0.04)",
                    padding: "4rem 2rem",
                  }}
                >
                  {/* Checkmark */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      border: `1.5px solid ${clrGreen}`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12L9 17L20 6" stroke="#9AB55C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: ff2,
                        fontSize: "var(--h4)",
                        fontWeight: 600,
                        color: clrTitle,
                        textTransform: "uppercase",
                        letterSpacing: "-0.01em",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Message Sent
                    </p>
                    <p style={{ fontFamily: ff1, fontSize: "0.9rem", color: clrText, lineHeight: "1.65", maxWidth: "36ch" }}>
                      Thank you for reaching out. I'll be in touch within 24 hours to discuss your project.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    style={{
                      fontFamily: ff2,
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: clrText2,
                      background: "transparent",
                      border: `1px solid ${clrBorder}`,
                      padding: "0.7em 1.5em",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = clrWhite)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = clrText2)}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" style={labelStyle}>
                        Full Name <span style={{ color: clrGreen }}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={fields.name}
                        onChange={(e) => setFields({ ...fields, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={labelStyle}>
                        Email Address <span style={{ color: clrGreen }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={fields.email}
                        onChange={(e) => setFields({ ...fields, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  {/* Company + Budget row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" style={labelStyle}>
                        Company / Brand
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Inc. (optional)"
                        value={fields.company}
                        onChange={(e) => setFields({ ...fields, company: e.target.value })}
                        onFocus={() => setFocused("company")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("company")}
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" style={labelStyle}>
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        value={fields.budget}
                        onChange={(e) => setFields({ ...fields, budget: e.target.value })}
                        onFocus={() => setFocused("budget")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle("budget"),
                          cursor: "pointer",
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%239AB55C' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="" disabled>Select a range</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} style={{ background: "#D4C9B8", color: "#1C1C1E" }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={labelStyle}>
                      Project Details <span style={{ color: clrGreen }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      placeholder="Tell me about your project — what you're building, your timeline, and any specific requirements..."
                      value={fields.message}
                      onChange={(e) => setFields({ ...fields, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        minHeight: "160px",
                      }}
                    />
                  </div>

                  {/* Error state */}
                  {formState === "error" && (
                    <p
                      style={{
                        fontFamily: ff1,
                        fontSize: "0.8rem",
                        color: "#c0392b",
                        border: "1px solid rgba(192,57,43,0.3)",
                        background: "rgba(192,57,43,0.06)",
                        padding: "0.75em 1em",
                      }}
                    >
                      Something went wrong. Please try emailing directly at{" "}
                      <a href="mailto:albert.marrero10@gmail.com" style={{ color: "inherit", textDecoration: "underline" }}>
                        albert.marrero10@gmail.com
                      </a>
                    </p>
                  )}

                  {/* Submit */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="group relative inline-flex items-center justify-start overflow-hidden"
                      style={{
                        fontFamily: ff2,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        background: clrGreen,
                        color: "#1C1C1E",
                        border: "none",
                        padding: "1em 2.5em",
                        cursor: formState === "sending" ? "wait" : "pointer",
                        opacity: formState === "sending" ? 0.7 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {formState === "sending" ? "Sending…" : "Send Message"}
                      {formState !== "sending" && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          style={{ marginLeft: "0.6rem" }}
                        >
                          <path
                            d="M1 6H11M11 6L6.5 1.5M11 6L6.5 10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    <p style={{ fontFamily: ff1, fontSize: "0.72rem", color: clrText2 }}>
                      I'll respond within 24 hours.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${clrBorder}`,
          paddingBlock: "2.5rem",
          paddingInline: "var(--pad-x)",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            marginInline: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo.png" alt="Marrero Web Studio" style={{ height: "32px", width: "auto" }} />
          </Link>
          <p
            style={{
              fontFamily: ff1,
              fontSize: "0.72rem",
              color: clrText2,
              letterSpacing: "0.04em",
            }}
          >
            © {new Date().getFullYear()} Marrero Web Studio. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes contact-word-appear {
          0%   { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); }
          50%  { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .contact-word-animate {
          display: inline-block;
          opacity: 0;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .contact-word-animate:hover {
          transform: translateY(-2px);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input::placeholder,
        textarea::placeholder {
          color: rgba(28, 28, 30, 0.35);
          font-family: var(--ff-1);
        }
        select option {
          background: #D4C9B8;
          color: #1C1C1E;
        }
      `}</style>
    </div>
  );
}
