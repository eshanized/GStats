import { ref } from 'vue';
import axios from 'axios';
import type { Repository, LanguageStats, Contributor, CodeStats } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export function useGitHubApi() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    try {
      const urlObj = new URL(url);
      const [, owner, repo] = urlObj.pathname.split('/');
      return { owner, repo };
    } catch {
      return null;
    }
  };

  const fetchRepositoryData = async (url: string) => {
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      throw new Error('Invalid GitHub repository URL');
    }

    const { owner, repo } = parsed;
    isLoading.value = true;
    error.value = null;

    // Create headers with a personal access token if available
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };

    // Add token if available in environment
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    try {
      const [repoData, languages, contributors] = await Promise.all([
        axios.get<Repository>(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers }),
        axios.get<LanguageStats>(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, { headers }),
        axios.get<Contributor[]>(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`, { headers })
      ]);

      const totalLines = Object.values(languages.data).reduce((acc, curr) => acc + curr, 0);
      
      const languageStats = Object.entries(languages.data).map(([name, lines]) => ({
        name,
        files: 0,
        lines,
        percentage: (lines / totalLines) * 100,
        color: '#' + Math.floor(Math.random()*16777215).toString(16)
      }));

      return {
        repository: repoData.data,
        codeStats: {
          totalLines,
          languages: languageStats
        },
        contributors: contributors.data
      };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          error.value = 'GitHub API rate limit exceeded. Please try again later or add a GitHub token.';
        } else if (e.response?.status === 404) {
          error.value = 'Repository not found. Please check the URL and try again.';
        } else {
          error.value = e.response?.data?.message || 'Failed to fetch repository data';
        }
      } else {
        error.value = e instanceof Error ? e.message : 'Failed to fetch repository data';
      }
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    fetchRepositoryData
  };
}