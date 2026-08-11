"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code, Brain, Search, Layers, Smartphone, Star } from "lucide-react"
import { getProjects } from "@/lib/data"
import { getAssetPath } from "@/lib/utils"
import Image from "next/image"

export function ProjectsSection() {
  const allProjects = getProjects()
  const [selectedFilter, setSelectedFilter] = useState("Featured")

  const categoryIcons: Record<string, typeof Code> = {
    Featured: Star,
    "Full Stack": Layers,
    "AI/ML": Brain,
    Research: Search,
    Mobile: Smartphone,
  }

  const categories = Array.from(new Set(allProjects.flatMap((p) => p.categories)))
  const filters = ["Featured", ...categories]

  const featuredOrder = [16, 8, 3, 1, 13, 5]

  const filteredProjects =
    selectedFilter === "Featured"
      ? allProjects
          .filter((p) => p.featured)
          .sort((a, b) => featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id))
      : allProjects.filter((p) => p.categories.includes(selectedFilter))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Selected work across full-stack systems, AI platforms, mobile apps, and published research
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => {
            const IconComponent = categoryIcons[filter] || Code
            return (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                <IconComponent className="h-3 w-3 mr-2" />
                {filter}
              </Button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} layout className="h-full">
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <Image
                      src={getAssetPath(project.image || "/placeholder.svg")}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => window.open(project.liveUrl, "_blank")}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit site
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.githubUrl, "_blank")}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        )}
                      </div>
                    )}
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary text-white hover:bg-primary">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="space-y-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
