<script setup lang="ts">
import { ref } from 'vue';
import { useRepositoryHistory } from '../composables/useRepositoryHistory';
import RepositoryHistory from './RepositoryHistory.vue';

const emit = defineEmits<{
  (e: 'analyze', url: string): void
}>();

const { addToHistory } = useRepositoryHistory();
const repoUrl = ref('');
const error = ref<string | null>(null);

const handleSubmit = () => {
  error.value = null;
  try {
    // Basic URL validation
    const url = new URL(repoUrl.value);
    if (!url.hostname.includes('github.com')) {
      error.value = 'Please enter a valid GitHub repository URL';
      return;
    }
    addToHistory(repoUrl.value);
    emit('analyze', repoUrl.value);
  } catch {
    error.value = 'Please enter a valid URL';
  }
};

const handleHistorySelect = (url: string) => {
  repoUrl.value = url;
  handleSubmit();
};
</script>

<template>
  <div class="space-y-6">
    <div class="card">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="repoUrl"
            type="url"
            placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
            class="flex-1 px-4 py-2 bg-nord-2/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-frost1 transition-all"
            required
          />
          <button
            type="submit"
            class="px-6 py-2 bg-gradient-to-r from-nord-frost1 to-nord-frost2 hover:from-nord-frost2 hover:to-nord-frost1 rounded-lg transition-all duration-500 font-medium"
          >
            Analyze
          </button>
        </div>
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
      </form>
    </div>
    
    <RepositoryHistory @select="handleHistorySelect" />
  </div>
</template>