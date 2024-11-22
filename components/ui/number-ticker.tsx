"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 20, // Lower damping for smoother animation
    stiffness: 200, // Lower stiffness for more fluid motion
    mass: 1.2, // Slightly higher mass for more natural feel
    restDelta: 0.001, // Smaller rest delta for smoother finish
  });
  const isInView = useInView(ref, { 
    once: true, 
    margin: "50px",
    amount: "some" 
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formattedValue = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
          useGrouping: true,
        }).format(Number(latest.toFixed(decimalPlaces)));
        
        ref.current.textContent = formattedValue;
      }
    });

    return () => unsubscribe();
  }, [springValue, decimalPlaces]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-white/90 tracking-wider transition-opacity duration-300",
        className,
      )}
      ref={ref}
    />
  );
}
