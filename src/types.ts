export interface CVTemplate {
  id: string;
  name: string;
  targetUser: string;
  description: string;
  accentColor: string;
  bgClass: string;
}

export interface CVData {
  fullName: string;
  email: string;
  phone: string;
  targetPosition: string;
  summary: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    achievements: string[];
  }[];
  certificates: string[];
  score: number;
  isOptimized: boolean;
}

export interface DetectedCertificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  status: 'detected' | 'added';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  type: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  applied: boolean;
  category?: 'technical' | 'labor' | 'office';
}

export type ApplicationStatus = 'applied' | 'viewed' | 'interview' | 'rejected';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  salary: string;
  status: ApplicationStatus;
  appliedDate: string;
  timeline: {
    status: ApplicationStatus;
    label: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
}
