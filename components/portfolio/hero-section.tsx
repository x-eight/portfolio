"use client"

import { motion } from "framer-motion"
import { Mail, ArrowDown } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/x-eight", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/saul-quispe-dev/", label: "LinkedIn" },
  //{ icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:saul.xeight@gmail.com", label: "Email" },
]

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm font-medium tracking-wider text-primary uppercase">
            {t.hero.greeting}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance"
        >
          {t.hero.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-xl font-medium text-primary sm:text-2xl"
        >
          {t.hero.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg text-pretty"
        >
          {t.hero.description}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button asChild size="lg" className="gap-2">
            <a href="#skills">
              {t.hero.cta}
              <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1"
        >
          <motion.div className="h-2 w-1 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
