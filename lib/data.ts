import experienceData from "@/data/experience.json"
import projectsData from "@/data/projects.json"
import skillsData from "@/data/skills.json"
import personalData from "@/data/personal.json"

export interface Position {
  role: string
  startDate: string
  endDate: string
  description: string
  technologies: string[]
}

export interface Experience {
  id: number
  company: string
  positions: Position[]
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category: string
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface SkillsData {
  frontend: Skill[]
  backend: Skill[]
  tools: Skill[]
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  bio: string
  location: string
  email: string
  phone: string
  website: string
  profileImage: string
  resume: string
  social: {
    github: string
    linkedin: string
    twitter?: string
    email: string
  }
  availability: {
    status: string
    message: string
  }
}

// Data fetching functions
export function getExperience(): Experience[] {
  return experienceData
}

export function getProjects(): Project[] {
  return projectsData
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter((project) => project.featured)
}

export function getProjectsByCategory(category: string): Project[] {
  return projectsData.filter((project) => project.category === category)
}

export function getSkills(): SkillsData {
  return skillsData
}

export function getAllSkills(): Skill[] {
  return [...skillsData.frontend, ...skillsData.backend, ...skillsData.tools]
}

export function getPersonalInfo(): PersonalInfo {
  return personalData
}

// Utility functions
export function formatDate(dateString: string): string {
  if (dateString === "Present") return "Present"

  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  })
}

export function calculateExperience(): number {
  const experiences = getExperience()
  if (experiences.length === 0) return 0

  // Find the earliest start date across all positions
  const allDates: Date[] = []
  experiences.forEach(experience => {
    experience.positions.forEach(position => {
      allDates.push(new Date(position.startDate))
    })
  })

  if (allDates.length === 0) return 0

  const earliestDate = allDates.reduce((earliest, current) =>
    current < earliest ? current : earliest
  )

  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - earliestDate.getTime())
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))

  return diffYears
}
