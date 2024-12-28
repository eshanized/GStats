<script setup lang="ts">
import type { CodeStats } from '../../types/github';

defineProps<{
  languages: CodeStats['languages'];
}>();
</script>

<template>
  <div class="space-y-2">
    <div class="h-4 w-full rounded-full overflow-hidden bg-nord-2/30 flex">
      <div v-for="lang in languages.slice(0, 5)" 
           :key="lang.name"
           :style="{
             width: `${lang.percentage}%`,
             backgroundColor: lang.color
           }"
           class="h-full transition-all duration-300 hover:opacity-90"
           :title="`${lang.name}: ${lang.percentage.toFixed(1)}%`">
      </div>
    </div>
    <div class="flex justify-between text-sm text-nord-snow0/70">
      <span>Language Distribution (Top 5)</span>
      <span>{{ languages[0]?.name }} is dominant</span>
    </div>
  </div>
</template>