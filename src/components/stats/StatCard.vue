<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  icon: string;
  gradientFrom?: string;
  gradientTo?: string;
  subtext?: string;
}>();
</script>

<template>
  <div class="stat-card group">
    <div 
      class="stat-icon-wrapper"
      :class="`bg-gradient-to-br from-${gradientFrom || 'nord-frost1'}/20 to-${gradientTo || 'nord-frost2'}/20`"
    >
      <span class="text-2xl">{{ icon }}</span>
    </div>
    <div>
      <h3 class="stat-label">{{ label }}</h3>
      <p class="stat-value">{{ value }}</p>
      <p v-if="subtext" class="text-sm text-nord-snow0/70">{{ subtext }}</p>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  @apply p-4 rounded-xl bg-nord-2/20 hover:bg-nord-2/30 
         transition-all duration-300 flex items-center gap-4;
}

.stat-icon-wrapper {
  @apply w-12 h-12 rounded-lg flex items-center justify-center
         shadow-lg group-hover:scale-110 transition-transform duration-300;
}

.stat-label {
  @apply text-sm font-medium text-nord-snow0/70 mb-1;
}

.stat-value {
  @apply text-2xl font-bold bg-gradient-to-r from-nord-frost1 to-nord-frost2 
         bg-clip-text text-transparent group-hover:scale-105 transition-transform;
}
</style>