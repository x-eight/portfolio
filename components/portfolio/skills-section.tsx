"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n-context"
import { BentoCard } from "./bento-card"
import {
  Server,
  Layout,
  Cloud,
  Code2,
  Database,
  FileCode,
  Palette,
  Box,
  Cpu,
  Container,
  Shield,
  Repeat,
  Briefcase,
  CreditCard,
  Zap,
  Share2,
  Layers,
  Sparkles,
  Brain,
  Link,
  Mic,
  Volume2,
  Search,
  Lock,
} from "lucide-react"

const skillCategories = [
  {
    key: "backend" as const,
    icon: Server,
    skills: [
      { name: "TypeScript", icon: FileCode },
      { name: "Python (FastAPI/Flask)", icon: Code2 },
      { name: "Node.js", icon: Server },
      { name: "PostgreSQL / pgvector", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Redis", icon: Cpu },
      { name: "GraphQL / REST APIs", icon: Share2 },
      { name: "Microservices", icon: Layers },
    ],
  },
  {
    key: "ai_specialization" as const,
    icon: Sparkles,
    skills: [
      { name: "Generative AI (GPT, Gemini)", icon: Brain },
      { name: "LangChain / RAG", icon: Link },
      { name: "ElevenLabs (TTS)", icon: Mic },
      { name: "Whisper / Deepgram (ASR)", icon: Volume2 },
      { name: "ElasticSearch", icon: Search },
      { name: "Vector Databases", icon: Database },
    ],
  },
  {
    key: "frontend" as const,
    icon: Layout,
    skills: [
      { name: "React", icon: Code2 },
      { name: "Next.js", icon: Box },
      { name: "Tailwind CSS", icon: Palette },
      { name: "Zustand / Redux", icon: Database },
      { name: "Framer Motion", icon: Layout },
    ],
  },
  {
    key: "devops" as const,
    icon: Cloud,
    skills: [
      { name: "AWS (EC2, ECS, CloudWatch)", icon: Cloud },
      { name: "Google Cloud Platform", icon: Cloud },
      { name: "Docker", icon: Container },
      { name: "CI/CD (AWS CodePipeline)", icon: Repeat },
      { name: "CloudFlare", icon: Shield },
    ],
  },
  {
    key: "business_tools" as const,
    icon: Briefcase,
    skills: [
      { name: "Stripe Integration", icon: CreditCard },
      { name: "Social Login / Auth0", icon: Lock },
      { name: "Process Automation", icon: Zap },
    ],
  }
];

export function SkillsSection() {
  const { t } = useI18n()

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t.skills.title}
          </h2>
          <p className="text-muted-foreground">{t.skills.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <BentoCard
              key={category.key}
              delay={categoryIndex * 0.1}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t.skills[category.key as keyof typeof t.skills]}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    <skill.icon className="h-4 w-4 text-primary" />
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
