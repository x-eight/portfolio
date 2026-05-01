"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n-context"
import { Heart } from "lucide-react"

export function Footer() {
  const { t } = useI18n()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border bg-background py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            {t.footer.builtWith}{" "}
            <span className="font-medium text-foreground">Next.js</span>
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Saul Quispe. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
