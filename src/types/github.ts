export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count?: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  homepage: string | null;
  fork?: boolean;
  archived?: boolean;
  // Optional enriched fields
  status?: 'completed' | 'in-progress' | 'archived';
  features?: string[];
  highlights?: string[];
  category?: 'mobile' | 'academic' | 'graduation' | 'ai' | 'smart-home' | 'web' | 'professional';
  year?: number;
  technologies?: string[];
}

export interface GitHubProfile {
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}