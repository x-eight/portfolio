"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n-context"
import { BentoCard } from "./bento-card"
import { ExternalLink, Github, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Multimodal RAG System",
    description:
      "Sistema avanzado de Retrieval-Augmented Generation capaz de procesar y consultar información a través de múltiples modalidades (texto, imágenes y documentos) utilizando LLMs de última generación.",
    technologies: ["Python", "OpenAI", "Vector Databases", "LangChain"],
    demoUrl: null, // Puedes añadirlo si tienes un Space en HuggingFace o similar
    repoUrl: "https://github.com/x-eight/RAG-multimodal",
    featured: true,
  },
  {
    title: "Smart Video Reframe",
    description:
      "Herramienta inteligente basada en IA para el reencuadre automático de video, detectando el sujeto principal para adaptar formatos horizontales a verticales (9:16) de forma dinámica.",
    technologies: ["Python", "Computer Vision", "MediaPipe", "MoviePy"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/smart-video-reframe",
    featured: true,
  },
  {
    title: "Next.js Inngest Orchestrator",
    description:
      "Plantilla profesional para la gestión de flujos de trabajo complejos y tareas en segundo plano (background jobs) utilizando Inngest dentro del ecosistema Next.js.",
    technologies: ["Next.js", "Inngest", "TypeScript", "Serverless"],
    demoUrl: "https://next-inngest.vercel.app/",
    repoUrl: "https://github.com/x-eight/next-inngest",
    featured: true,
  },
  {
    title: "WebCodec Video Generator",
    description:
      "Motor de generación de video de alto rendimiento que utiliza la API nativa WebCodecs para renderizar y exportar video directamente desde el navegador.",
    technologies: ["JavaScript", "WebCodecs API", "Canvas", "Web Workers"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/webcodec-video-generator",
    featured: false,
  },
  {
    title: "PDF to JSON Extractor",
    description:
      "Extractor de datos de alta precisión que convierte documentos PDF complejos en estructuras JSON limpias, ideal para alimentar pipelines de datos o modelos de IA.",
    technologies: ["Python", "PyMuPDF", "Data Engineering", "JSON"],
    demoUrl: null,
    repoUrl: "https://github.com/x-eight/pdf-to-json",
    featured: false,
  },
];
export function ProjectsSection() {
  const { t } = useI18n()

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t.projects.title}
          </h2>
          <p className="text-muted-foreground">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <BentoCard
              key={project.title}
              delay={index * 0.1}
              className={project.featured ? "md:col-span-1" : ""}
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Folder className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">View code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="sr-only">View demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 pt-4 border-t border-border">
                  {project.demoUrl && (
                    <Button asChild size="sm" variant="default" className="flex-1">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        {t.projects.viewDemo}
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        {t.projects.viewCode}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
