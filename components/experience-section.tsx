"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2 } from "lucide-react"
import { getExperience, formatDate } from "@/lib/data"

export function ExperienceSection() {
  const experiences = getExperience()

  // Sort experiences by most recent start date
  const sortedExperiences = experiences.sort((a, b) => {
    const latestA = Math.max(...a.positions.map(p => new Date(p.startDate === "Present" ? new Date() : p.startDate).getTime()))
    const latestB = Math.max(...b.positions.map(p => new Date(p.startDate === "Present" ? new Date() : p.startDate).getTime()))
    return latestB - latestA
  })

  const getCompanyDuration = (companyId: number) => {
    const company = experiences.find(exp => exp.id === companyId)
    if (!company) return ""

    const allDates = company.positions.map(pos => ({
      start: new Date(pos.startDate),
      end: pos.endDate === "Present" ? new Date() : new Date(pos.endDate)
    }))

    const earliest = Math.min(...allDates.map(d => d.start.getTime()))
    const latest = Math.max(...allDates.map(d => d.end.getTime()))

    const diffTime = latest - earliest
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    const years = Math.floor(diffMonths / 12)
    const months = diffMonths % 12

    if (years > 0 && months > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`
    } else {
      return `${months} mo${months > 1 ? 's' : ''}`
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            My professional journey in software development, from internship to project management
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {sortedExperiences.map((experience, index) => (
                <motion.div key={experience.id} variants={itemVariants} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                  <Card className="md:ml-20 group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Company Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors">
                            {experience.company}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {getCompanyDuration(experience.id)}
                          </p>
                        </div>
                      </div>

                      {/* All Positions - Always Visible */}
                      <div className="space-y-6">
                        {experience.positions.map((position, positionIndex) => {
                          const isFirstPosition = positionIndex === 0

                          return (
                            <div
                              key={positionIndex}
                              className={`${!isFirstPosition ? 'border-l-2 border-muted pl-4 ml-2' : ''}`}
                            >
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                                <div>
                                  <h4 className="text-lg font-medium">
                                    {position.role}
                                  </h4>
                                  {!isFirstPosition && (
                                    <div className="flex items-center gap-2 text-sm text-green-600 mt-1">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span>Promotion</span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {formatDate(position.startDate)} - {formatDate(position.endDate)}
                                  </span>
                                </div>
                              </div>

                              <p className="text-muted-foreground mb-4 leading-relaxed">
                                {position.description}
                              </p>

                              {/* Technologies */}
                              <div className="flex flex-wrap gap-2">
                                {position.technologies.map((tech) => (
                                  <Badge
                                    key={tech}
                                    variant="secondary"
                                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
