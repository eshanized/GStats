<script setup lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { CodeStats } from '../types/github';

ChartJS.register(ArcElement, Tooltip, Legend);

defineProps<{
  stats: CodeStats;
}>();
</script>

<template>
  <div class="card group hover-lift">
    <h2 class="text-xl font-bold mb-6 flex items-center gap-3">
      <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-nord-frost1 to-nord-frost2 
                   flex items-center justify-center text-nord-0 shadow-lg">
        🎨
      </span>
      Language Distribution
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="h-[300px] relative glow">
        <Pie
          :data="{
            labels: stats.languages.map(l => l.name),
            datasets: [{
              data: stats.languages.map(l => l.lines),
              backgroundColor: stats.languages.map(l => l.color),
              borderWidth: 2,
              borderColor: '#2E3440'
            }]
          }"
          :options="{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  color: '#D8DEE9',
                  font: {
                    size: 12
                  }
                }
              },
              tooltip: {
                backgroundColor: '#3B4252',
                titleColor: '#88C0D0',
                bodyColor: '#D8DEE9',
                borderColor: '#4C566A',
                borderWidth: 1
              }
            }
          }"
        />
      </div>
      <div class="space-y-4">
        <div v-for="lang in stats.languages" 
             :key="lang.name" 
             class="p-3 rounded-lg bg-nord-2/20 hover:bg-nord-2/30 transition-all duration-300
                    flex items-center gap-4 group cursor-default">
          <div class="w-3 h-3 rounded-full"
               :style="{ backgroundColor: lang.color }"></div>
          <div class="flex-1">
            <h3 class="font-semibold group-hover:text-nord-frost1 transition-colors">
              {{ lang.name }}
            </h3>
            <div class="flex justify-between text-sm text-nord-snow0/70">
              <span>{{ lang.lines.toLocaleString() }} lines</span>
              <span>{{ lang.percentage.toFixed(1) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>