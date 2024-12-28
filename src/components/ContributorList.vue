<script setup lang="ts">
import type { Contributor } from '../types/github';

defineProps<{
  contributors: Contributor[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="contributor in contributors" :key="contributor.login" class="card">
      <div class="flex items-center gap-4">
        <img
          :src="contributor.avatar_url"
          :alt="contributor.login"
          class="w-16 h-16 rounded-full"
        />
        <div>
          <h3 class="font-bold">{{ contributor.name || contributor.login }}</h3>
          <a
            :href="contributor.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-nord-frost1 hover:text-nord-frost2 transition-all"
          >
            @{{ contributor.login }}
          </a>
        </div>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-nord-snow0/70">Commits</p>
          <p class="font-semibold">{{ contributor.contributions }}</p>
        </div>
        <div v-if="contributor.additions !== undefined">
          <p class="text-sm text-nord-snow0/70">Lines Changed</p>
          <p class="font-semibold">
            +{{ contributor.additions }} / -{{ contributor.deletions }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>