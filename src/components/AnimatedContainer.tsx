"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function AnimatedContainer({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string; }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className={className}>{children}</div>;
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, ease: "easeOut", delay }}>{children}</motion.div>;
}
