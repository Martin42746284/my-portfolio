export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'replied';
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  technologies: string[];
  color: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demo_url?: string;
  github_url?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
}