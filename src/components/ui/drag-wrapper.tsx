"use client";

import { cn } from "@/lib/utils";
import { motion, animate, MotionProps } from "framer-motion";
import React, { ReactNode } from "react";

interface DraggableWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export default function DraggableWrapper({
  initial,
  children,
  className,
  ...props
}: DraggableWrapperProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={initial}
      whileDrag={{ scale: 0.9, className: "cursor-grabbing" }}
      whileHover={{ rotate: 2 }}
      className={cn("absolute cursor-grab", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
