"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n-context"
import { BentoCard } from "./bento-card"
import { GitCommit, GitFork, Users, Star, Activity, LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react"

// Generate deterministic contribution data for the heatmap using a seeded approach
const generateContributions = () => {
  const contributions = []
  // Use a simple deterministic pattern based on week and day indices
  for (let week = 0; week < 52; week++) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      // Create a deterministic pattern that looks organic
      const seed = (week * 7 + day + 1) * 13 % 100
      let level = 0
      if (seed > 80) level = 4
      else if (seed > 60) level = 3
      else if (seed > 40) level = 2
      else if (seed > 20) level = 1
      weekData.push(level)
    }
    contributions.push(weekData)
  }
  return contributions
}

const contributions = generateContributions()

const getContributionColor = (level: number) => {
  const colors = [
    "bg-secondary",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/60",
    "bg-primary/80",
  ]
  return colors[level] || colors[0]
}

export function GitHubSection() {
  const [stats, setStats] = useState<{
    key: string;
    value: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }[]>([])

  async function getGithubStats() {
    const user = await fetch("https://api.github.com/users/x-eight").then(r => r.json())

    const repos = await fetch(
      "https://api.github.com/users/x-eight/repos?per_page=100"
    ).then(r => r.json())

    const stars = repos.reduce(
      (acc: number, repo: any) => acc + repo.stargazers_count,
      0
    )

    const contributions = await fetch("https://github-contributions-api.jogruber.de/v4/x-eight").then(r => r.json())
    const totalContributions = Object.values(contributions.total).reduce((sum: number, n: any) => sum + n, 0)

    return {
      repositories: user.public_repos,
      followers: user.followers,
      stars,
      contributions: totalContributions,
    }
  }

  useEffect(() => {
    getGithubStats().then((res) => {
      setStats([
        { key: "contributions", value: res.contributions, icon: GitCommit },
        { key: "repositories", value: res.repositories, icon: GitFork },
        { key: "followers", value: res.followers, icon: Users },
        { key: "stars", value: res.stars, icon: Star },
      ])
    })
  }, [])

  const { t } = useI18n()

  return (
    <section id="github" className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t.github.title}
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-1">
            {stats.map((stat, index) => (
              <BentoCard key={stat.key} delay={index * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {/*@ts-ignore*/}
                    {t.github[stat.key]}
                  </p>
                </div>
              </BentoCard>
            ))}
          </div>

          {/* Contribution Graph */}
          <BentoCard delay={0.4} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                {t.github.contributions}
              </h3>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-1 min-w-max">
                {contributions.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((level, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.2,
                          delay: weekIndex * 0.01 + dayIndex * 0.01,
                        }}
                        className={`h-3 w-3 rounded-sm ${getContributionColor(level)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-3 w-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
