"use client"

import { useState } from "react"
import { Navbar } from "@/components/portfolio/navbar"
import { HeroSection } from "@/components/portfolio/hero-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { GitHubSection } from "@/components/portfolio/github-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { AIAssistantModal } from "@/components/portfolio/ai-assistant-modal"
import { Footer } from "@/components/portfolio/footer"

export default function PortfolioPage() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navbar onOpenAI={() => setIsAIModalOpen(true)} />
      <HeroSection />
      <SkillsSection />
      <GitHubSection />
      <ExperienceSection />
      <ProjectsSection />
      <Footer />
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />
    </main>
  )
}
