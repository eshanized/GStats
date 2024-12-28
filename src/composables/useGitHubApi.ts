import { ref } from 'vue';
import axios from 'axios';
import type { Repository, LanguageStats, Contributor } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export function useGitHubApi() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Parse the GitHub URL and extract owner/repo
  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    try {
      const urlObj = new URL(url);
      const [, owner, repo] = urlObj.pathname.split('/');
      return owner && repo ? { owner, repo } : null;
    } catch {
      return null;
    }
  };

  // Fetch repository data, including languages and contributors
  const fetchRepositoryData = async (url: string) => {
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      throw new Error('Invalid GitHub repository URL');
    }

    const { owner, repo } = parsed;
    isLoading.value = true;
    error.value = null;

    // Prepare headers without token
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };

    try {
      // Parallel API requests for repository data, languages, and contributors
      const [repoData, languages, contributors] = await Promise.all([
        axios.get<Repository>(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers }),
        axios.get<LanguageStats>(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`, { headers }),
        axios.get<Contributor[]>(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`, { headers })
      ]);

      // Calculate total lines of code and prepare language stats
      const totalLines = Object.values(languages.data).reduce((acc, curr) => acc + curr, 0);
      const languageStats = Object.entries(languages.data).map(([name, lines]) => ({
        name,
        files: 0,  // Note: You may want to calculate the actual files count if relevant
        lines,
        percentage: (lines / totalLines) * 100,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      }));

      // Return structured data
      return {
        repository: repoData.data,
        codeStats: {
          totalLines,
          languages: languageStats
        },
        contributors: contributors.data
      };
    } catch (e) {
      // Improved error handling for different cases
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          error.value = 'GitHub API rate limit exceeded. Please try again later.';
        } else if (e.response?.status === 404) {
          error.value = 'Repository not found. Please check the URL and try again.';
        } else {
          error.value = e.response?.data?.message || 'Failed to fetch repository data';
        }
      } else {
        error.value = e instanceof Error ? e.message : 'An unknown error occurred while fetching repository data';
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
