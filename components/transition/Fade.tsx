"use client";

import { motion } from "framer-motion";

export default function FadeTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
    // <motion.div
    //   initial={{ opacity: 0, x: 50 }}
    //   animate={{ opacity: 1, x: 0 }}
    //   exit={{ opacity: 0, x: -50 }}
    //   transition={{
    //     type: "tween", // Lighter than spring
    //     ease: "easeInOut",
    //     duration: 0.5,
    //   }}
    //   className={className}
    //   style={{ willChange: "transform, opacity" }} // GPU boost
    // >
    //   {children}
    // </motion.div>
  );
}
