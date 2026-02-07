import { z } from "zod";

export const SkillSchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100),
});

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string().optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  tech: z.array(z.string()).optional(),
  url: z.string().url().optional(),
  stars: z.number().optional(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  year: z.string(),
});

export const ContactSchema = z.object({
  email: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
});

export const PortfolioSchema = z.object({
  theme: z.string().default("default"),
  name: z.string(),
  title: z.string(),
  tagline: z.string().optional(),
  about: z.string().optional(),
  skills: z.array(SkillSchema).optional(),
  experience: z.array(ExperienceSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  education: z.array(EducationSchema).optional(),
  contact: ContactSchema.optional(),
});

export type Skill = z.infer<typeof SkillSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Portfolio = z.infer<typeof PortfolioSchema>;
