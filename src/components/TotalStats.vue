<script setup lang="ts">
import type { CodeStats } from '../types/github';
import { formatNumber } from '../utils/formatters';
import StatCard from './stats/StatCard.vue';
import LanguageDistribution from './stats/LanguageDistribution.vue';

defineProps<{
  stats: CodeStats;
}>();
</script>

<template>
  <div class="card space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <span class="w-12 h-12 rounded-xl bg-gradient-to-br from-nord-frost1 to-nord-frost2 
                     flex items-center justify-center text-nord-0 shadow-lg">
          📊
        </span>
        Repository Overview
      </h2>
      <div class="hidden sm:flex items-center gap-2 text-nord-snow0/70">
        <span class="w-3 h-3 bg-nord-frost1 rounded-full animate-pulse"></span>
        Live Analysis
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Lines"
        :value="formatNumber(stats.totalLines)"
        icon="📝"
        gradient-from="nord-frost1"
        gradient-to="nord-frost2"
      />

      <StatCard
        label="Languages"
        :value="stats.languages.length"
        icon="🎨"
        gradient-from="nord-frost2"
        gradient-to="nord-frost3"
      />

      <StatCard
        label="Avg. Lines/Lang"
        :value="formatNumber(Math.round(stats.totalLines / stats.languages.length))"
        icon="📈"
        gradient-from="nord-frost3"
        gradient-to="nord-frost1"
      />

      <StatCard
        label="Primary Language"
        :value="stats.languages[0]?.name || 'N/A'"
        :subtext="`${stats.languages[0]?.percentage.toFixed(1)}% of codebase`"
        icon="⭐"
        gradient-from="nord-frost2"
        gradient-to="nord-frost1"
      />
    </div>

    <LanguageDistribution :languages="stats.languages" />
  </div>
</template>