<script setup lang="ts">
import { ref } from 'vue';
import { useGitHubApi } from './composables/useGitHubApi';
import Navbar from './components/Navbar.vue';
import RepositoryInput from './components/RepositoryInput.vue';
import TotalStats from './components/TotalStats.vue';
import LanguageStats from './components/LanguageStats.vue';
import ContributorProfile from './components/ContributorProfile.vue';
import ExportButtons from './components/ExportButtons.vue';
import Footer from './components/Footer.vue';
import type { CodeStats, Contributor } from './types/github';

const { isLoading, error, fetchRepositoryData } = useGitHubApi();
const codeStats = ref<CodeStats | null>(null);
const contributors = ref<Contributor[]>([]);
const repositoryData = ref<any>(null);

const handleAnalyze = async (url: string) => {
  try {
    const data = await fetchRepositoryData(url);
    codeStats.value = data.codeStats;
    contributors.value = data.contributors;
    repositoryData.value = data;
  } catch (e) {
    // Error is handled by useGitHubApi
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <div class="flex-1 px-6">
      <header class="max-w-6xl mx-auto mb-8">
        <RepositoryInput @analyze="handleAnalyze" />
      </header>

      <main class="max-w-6xl mx-auto space-y-8">
        <div v-if="isLoading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-nord-frost1 border-t-transparent mx-auto"></div>
          <p class="mt-4">Analyzing repository...</p>
        </div>

        <div v-else-if="error" class="card bg-red-900/20 text-red-200">
          <p>{{ error }}</p>
        </div>

        <template v-else-if="codeStats">
          <div class="flex justify-end">
            <ExportButtons v-if="repositoryData" :data="repositoryData" />
          </div>
          
          <TotalStats :stats="codeStats" />
          <LanguageStats :stats="codeStats" />
          
          <section v-if="contributors.length">
            <h2 class="text-2xl font-bold mb-6">Contributors</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ContributorProfile
                v-for="contributor in contributors"
                :key="contributor.login"
                :contributor="contributor"
              />
            </div>
          </section>
        </template>
      </main>
    </div>

    <Footer />
  </div>
</template>