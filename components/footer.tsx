"use client"

import { motion } from "framer-motion"
import { getPersonalInfo } from "@/lib/data"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"

export function Footer() {
  const personalInfo = getPersonalInfo()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.social.github,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: personalInfo.social.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: personalInfo.email,
      label: "Email",
    }
  ]

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo/Name */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
            <p className="text-muted-foreground mt-2">{personalInfo.title}</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-muted-foreground flex items-center justify-center md:justify-end gap-2">
              © {currentYear} Made with <Heart className="h-4 w-4 text-red-500" /> by {personalInfo.name}
            </p>
          </motion.div>
        </div>

        {/* Back to top button */}
        <motion.div
          className="text-center mt-8 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Back to top ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
