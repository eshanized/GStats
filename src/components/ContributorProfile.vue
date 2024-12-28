<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Contributor } from '../types/github';

interface GitHubProfile {
  followers: number;
  bio: string | null;
}

const props = defineProps<{
  contributor: Contributor;
}>();

const profile = ref<GitHubProfile | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${props.contributor.login}`);
    if (response.ok) {
      profile.value = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="card group hover-lift">
    <div class="flex items-center gap-4 mb-6">
      <div class="relative">
        <div class="absolute inset-0 rounded-full bg-gradient-to-r from-nord-frost1 to-nord-frost2 
                    blur-sm group-hover:blur-md transition-all duration-500"></div>
        <img
          :src="contributor.avatar_url"
          :alt="contributor.login"
          class="w-20 h-20 rounded-full border-2 border-nord-2/30 relative
                 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div>
        <h3 class="text-xl font-bold bg-gradient-to-r from-nord-frost1 to-nord-frost2 
                   bg-clip-text text-transparent group-hover:scale-105 transition-transform">
          {{ contributor.name || contributor.login }}
        </h3>
        <a
          :href="contributor.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-nord-snow0/70 hover:text-nord-frost1 transition-all flex items-center gap-1"
        >
          <span>@{{ contributor.login }}</span>
          <span class="text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
        </a>
      </div>
    </div>

    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 rounded-lg bg-nord-2/20 hover:bg-nord-2/30 transition-all duration-300">
          <p class="text-sm font-medium text-nord-snow0/70 mb-1">Commits</p>
          <p class="text-2xl font-bold text-nord-frost1">
            {{ contributor.contributions.toLocaleString() }}
          </p>
        </div>
        <div v-if="profile?.followers" 
             class="p-4 rounded-lg bg-nord-2/20 hover:bg-nord-2/30 transition-all duration-300">
          <p class="text-sm font-medium text-nord-snow0/70 mb-1">Followers</p>
          <p class="text-2xl font-bold text-nord-frost2">
            {{ profile.followers.toLocaleString() }}
          </p>
        </div>
      </div>

      <div v-if="contributor.additions !== undefined" 
           class="p-4 rounded-lg bg-nord-2/20 hover:bg-nord-2/30 transition-all duration-300">
        <p class="text-sm font-medium text-nord-snow0/70 mb-2">Lines Changed</p>
        <div class="flex gap-6">
          <div class="flex items-center gap-2">
            <span class="text-green-400">+</span>
            <span class="font-mono text-xl">{{ contributor.additions.toLocaleString() }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-red-400">-</span>
            <span class="font-mono text-xl">{{ contributor.deletions?.toLocaleString() || 0 }}</span>
          </div>
        </div>
      </div>

      <div v-if="profile?.bio" 
           class="p-4 rounded-lg bg-nord-2/20 hover:bg-nord-2/30 transition-all duration-300">
        <p class="text-sm font-medium text-nord-snow0/70 mb-2">Bio</p>
        <p class="text-sm leading-relaxed">{{ profile.bio }}</p>
      </div>
    </div>
  </div>
</template>