<script setup lang="ts">
import { useRepositoryHistory } from '../composables/useRepositoryHistory';

const { history, bookmarks, toggleBookmark } = useRepositoryHistory();
const emit = defineEmits<{
  (e: 'select', url: string): void
}>();
</script>

<template>
  <div class="space-y-4">
    <!-- Bookmarks Section -->
    <div v-if="bookmarks.length > 0" class="card shadow-lg rounded-lg p-4 bg-white">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2 text-nord-frost1">
        <span class="text-xl">⭐</span> Bookmarks
      </h3>
      <div class="space-y-2">
        <div
          v-for="url in bookmarks"
          :key="url"
          @click="emit('select', url)"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-nord-2/30 transition-colors flex items-center justify-between cursor-pointer"
          aria-label="Select bookmark"
        >
          <span class="truncate" aria-hidden="true">{{ url }}</span>
          <button
            @click.stop="toggleBookmark(url)"
            class="text-nord-frost1 hover:text-nord-frost2"
            aria-label="Remove bookmark"
          >
            ⭐
          </button>
        </div>
      </div>
    </div>

    <!-- Recent History Section -->
    <div v-if="history.length > 0" class="card shadow-lg rounded-lg p-4 bg-white">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2 text-nord-frost2">
        <span class="text-xl">🕒</span> Recent
      </h3>
      <div class="space-y-2">
        <div
          v-for="url in history"
          :key="url"
          @click="emit('select', url)"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-nord-2/30 transition-colors flex items-center justify-between cursor-pointer"
          aria-label="Select recent item"
        >
          <span class="truncate" aria-hidden="true">{{ url }}</span>
          <button
            v-if="!bookmarks.includes(url)"
            @click.stop="toggleBookmark(url)"
            class="text-nord-snow0/30 hover:text-nord-frost1"
            aria-label="Add to bookmarks"
          >
            ⭐
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
