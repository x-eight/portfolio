"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BentoCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-6",
        "backdrop-blur-sm transition-colors",
        "hover:border-primary/50 hover:bg-card/80",
        "dark:bg-card/50 dark:hover:bg-card/70",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
