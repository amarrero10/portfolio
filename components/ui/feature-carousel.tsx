"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  GlobalSearchIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
  DatabaseIcon,
  CodeIcon,
  BrowserIcon,
  ShoppingCartCheckIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

const FEATURES = [
  {
    id: "ecommerce",
    label: "E-Commerce Platform",
    icon: ShoppingCartCheckIcon,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
    description: "Full-featured online store with real-time inventory, Stripe payments, and an admin dashboard built for scale.",
    url: "#",
  },
  {
    id: "saas",
    label: "SaaS Dashboard",
    icon: DashboardSquare01Icon,
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    description: "Real-time data visualization and user management dashboard for a Series A fintech startup.",
    url: "#",
  },
  {
    id: "agency",
    label: "Agency Website",
    icon: BrowserIcon,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200",
    description: "Award-nominated agency site with immersive scroll animations and headless CMS integration.",
    url: "#",
  },
  {
    id: "mobile",
    label: "Mobile Banking App",
    icon: SmartPhone01Icon,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    description: "Cross-platform banking app with biometric auth, real-time notifications, and instant transfers.",
    url: "#",
  },
  {
    id: "api",
    label: "API Integration",
    icon: CodeIcon,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200",
    description: "High-throughput REST & GraphQL API layer serving millions of requests with sub-50ms latency.",
    url: "#",
  },
  {
    id: "analytics",
    label: "Real-time Analytics",
    icon: GlobalSearchIcon,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    description: "Live analytics pipeline processing 100K+ events/second with custom dashboards and alerting.",
    url: "#",
  },
  {
    id: "database",
    label: "Database Architecture",
    icon: DatabaseIcon,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200",
    description: "Scalable PostgreSQL schema design with partitioning, indexing, and read-replica strategies.",
    url: "#",
  },
  {
    id: "automation",
    label: "AI Automations",
    icon: MagicWandIcon,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
    description: "Workflow automation pipelines powered by LLMs — from content generation to data extraction.",
    url: "#",
  },
  {
    id: "quality",
    label: "Quality & Testing",
    icon: CheckmarkCircle01Icon,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200",
    description: "End-to-end testing suites with Playwright, Vitest, and CI/CD pipelines that ship with confidence.",
    url: "#",
  },
];

const AUTO_PLAY_INTERVAL = 5500;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-black/10">
        {/* Left panel — nav chips */}
        <div
          className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16"
          style={{ background: "var(--clr-green)" }}
        >
          <div
            className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 z-40"
            style={{ background: "linear-gradient(to bottom, var(--clr-green), transparent)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 z-40"
            style={{ background: "linear-gradient(to top, var(--clr-green), transparent)" }}
          />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-colors duration-700 text-left group border",
                      isActive
                        ? "border-[#1C1C1E] z-10"
                        : "bg-transparent border-black/20 hover:border-black/40"
                    )}
                    style={
                      isActive
                        ? { background: "var(--clr-white)", color: "var(--clr-green)" }
                        : { color: "rgba(28,28,30,0.55)" }
                    }
                  >
                    <div
                      className="flex items-center justify-center transition-colors duration-500"
                      style={isActive ? { color: "var(--clr-green)" } : { color: "rgba(28,28,30,0.4)" }}
                    >
                      <HugeiconsIcon icon={feature.icon} size={18} strokeWidth={2} />
                    </div>
                    <span
                      className="font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase"
                      style={{ fontFamily: "var(--ff-2)", letterSpacing: "0.06em" }}
                    >
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right panel — cards */}
        <div
          className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-black/10"
          style={{ background: "var(--clr-light-black)" }}
        >
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden origin-center"
                  style={{
                    borderWidth: "4px",
                    borderStyle: "solid",
                    borderColor: "var(--clr-light-black)",
                    background: "var(--clr-black)",
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-10 pt-32 flex flex-col justify-end pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(2,2,2,0.92) 0%, rgba(2,2,2,0.4) 60%, transparent 100%)" }}
                      >
                        <div
                          className="px-4 py-1.5 rounded-full text-[11px] font-normal uppercase w-fit mb-3"
                          style={{
                            background: "rgba(28,28,30,0.85)",
                            color: "var(--clr-green)",
                            border: "1px solid rgba(154,181,92,0.35)",
                            fontFamily: "var(--ff-1)",
                            letterSpacing: "0.2em",
                          }}
                        >
                          {index + 1} • {feature.label}
                        </div>
                        <p
                          className="font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight mb-4"
                          style={{ color: "var(--clr-white)", fontFamily: "var(--ff-1)" }}
                        >
                          {feature.description}
                        </p>
                        <div className="pointer-events-auto flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/projects/${feature.id}`}
                            style={{
                              fontFamily: "var(--ff-1)",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.12em",
                              background: "var(--clr-green)",
                              color: "var(--clr-black)",
                              padding: "0.55em 1.2em",
                              transition: "opacity 0.2s ease",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              textDecoration: "none",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                          >
                            Project Overview
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M2 6L6 2M6 2H3M6 2V5M1 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                          <a
                            href={feature.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: "var(--ff-1)",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.12em",
                              background: "transparent",
                              color: "rgba(255,255,255,0.7)",
                              border: "1px solid rgba(255,255,255,0.25)",
                              padding: "0.55em 1.2em",
                              transition: "color 0.2s ease, border-color 0.2s ease",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#fff"
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "rgba(255,255,255,0.7)"
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
                            }}
                          >
                            Visit Site
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--clr-green)", boxShadow: "0 0 10px var(--clr-green)" }}
                    />
                    <span
                      className="text-[10px] font-normal uppercase font-mono"
                      style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.3em" }}
                    >
                      Live Project
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
