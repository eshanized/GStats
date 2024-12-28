export interface Repository {
  name: string;
  full_name: string;
  description: string;
  language: string;
  languages_url: string;
}

export interface LanguageStats {
  [key: string]: number;
}

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  name?: string;
  additions?: number;
  deletions?: number;
}

export interface CodeStats {
  totalLines: number;
  languages: {
    name: string;
    files: number;
    lines: number;
    percentage: number;
    color: string;
  }[];
}