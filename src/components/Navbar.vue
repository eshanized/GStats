<script setup lang="ts">
import { ref } from 'vue';

const links = [
  { 
    icon: '⭐', 
    label: 'GitHub',
    url: 'https://github.com/eshanized' 
  },
  { 
    icon: '🐦', 
    label: 'Twitter',
    url: 'https://twitter.com/eshanized' 
  },
  { 
    icon: '💼', 
    label: 'Portfolio',
    url: 'https://eshanized.dev' 
  }
];

const isScrolled = ref(false);

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20;
  });
}
</script>

<template>
  <nav :class="['glass-nav py-4 px-6', { 'shadow-lg': isScrolled }]">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-nord-frost1 to-nord-frost2 flex items-center justify-center">
          <span class="text-nord-0 font-bold">GA</span>
        </div>
        <h1 class="text-xl font-bold bg-gradient-to-r from-nord-frost1 to-nord-frost2 bg-clip-text text-transparent">
          GitHub Analytics
        </h1>
      </div>
      <div class="flex gap-6">
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-nord-snow0/70 hover:text-nord-frost1 transition-all"
        >
          <span class="text-lg">{{ link.icon }}</span>
          <span class="hidden sm:inline text-sm font-medium">{{ link.label }}</span>
        </a>
      </div>
    </div>
  </nav>
</template>