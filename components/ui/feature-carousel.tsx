"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import {
  BrowserIcon,
  ConstructionIcon,
  LeafIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const FEATURES = [
  {
    id: "roses-by-lina",
    label: "Floral Design Studio",
    icon: BrowserIcon,
    image: "https://images.unsplash.com/photo-1740511319080-b1be1e328be5?q=80&w=1200",
    description: "Luxury floral studio site for Roses by Lina — elegant layout, bilingual support, and a custom inquiry form.",
    url: "https://roses-by-lina.vercel.app",
  },
  {
    id: "terragold",
    label: "Construction Services",
    icon: ConstructionIcon,
    image: "/terragold-thumb.png",
    description: "Marketing site for TerraGold Construction Services — a Tampa Bay exterior and stucco specialist, built to convert visitors into free-estimate leads.",
    url: "https://www.terragoldconstruction.com/",
  },
  {
    id: "aura-wellness",
    label: "Wellness Clinic",
    icon: LeafIcon,
    image: "/aura-wellness-thumb.png",
    description: "Booking-focused site for Aura Wellness, a Tampa Bay medical aesthetics clinic offering weight loss and hormone therapy.",
    url: "https://aura-wellness-black.vercel.app/",
  },
];

export function FeatureCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
              mass: 1,
              delay: index * 0.12,
            }}
            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            <img
              src={feature.image}
              alt={feature.label}
              className="absolute inset-0 w-full h-full object-cover object-top grayscale-[0.35] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{ background: "linear-gradient(180deg, rgba(2,2,2,0.15) 0%, rgba(2,2,2,0.35) 60%, rgba(2,2,2,0.55) 100%)" }}
            />

            {/* Live badge */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--clr-green)", boxShadow: "0 0 10px var(--clr-green)" }}
              />
              <span
                className="text-[10px] font-normal uppercase font-mono"
                style={{ color: "rgba(255,255,255,0.85)", letterSpacing: "0.3em" }}
              >
                Live Project
              </span>
            </div>

            {/* Icon chip */}
            <div
              className="absolute top-6 right-6 flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: "rgba(28,28,30,0.55)", backdropFilter: "blur(6px)", color: "var(--clr-green)" }}
            >
              <HugeiconsIcon icon={feature.icon} size={16} strokeWidth={2} />
            </div>

            <div
              className="absolute inset-x-0 bottom-0 p-7 md:p-8 flex flex-col justify-end"
              style={{ background: "linear-gradient(to top, rgba(2,2,2,0.94) 0%, rgba(2,2,2,0.55) 55%, transparent 100%)" }}
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
                0{index + 1} • {feature.label}
              </div>
              <p
                className="font-normal text-lg md:text-xl leading-tight drop-shadow-md tracking-tight mb-4"
                style={{ color: "rgba(255,255,255,0.92)", fontFamily: "var(--ff-1)" }}
              >
                {feature.description}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/projects/${feature.id}`}
                  style={{
                    fontFamily: "var(--ff-1)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    background: "var(--clr-green)",
                    color: "var(--clr-white)",
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
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  }}
                >
                  Visit Site
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCarousel;
