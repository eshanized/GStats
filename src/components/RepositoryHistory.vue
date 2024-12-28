<script setup lang="ts">
import { useRepositoryHistory } from '../composables/useRepositoryHistory';

const { history, bookmarks, toggleBookmark } = useRepositoryHistory();
const emit = defineEmits<{
  (e: 'select', url: string): void
}>();
</script>

<template>
  <div class="space-y-4">
    <div v-if="bookmarks.length > 0" class="card">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
        <span class="text-nord-frost1">⭐</span> Bookmarks
      </h3>
      <div class="space-y-2">
        <button
          v-for="url in bookmarks"
          :key="url"
          @click="emit('select', url)"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-nord-2/30 transition-colors flex items-center justify-between"
        >
          <span class="truncate">{{ url }}</span>
          <button
            @click.stop="toggleBookmark(url)"
            class="text-nord-frost1 hover:text-nord-frost2"
          >
            ⭐
          </button>
        </button>
      </div>
    </div>

    <div v-if="history.length > 0" class="card">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
        <span class="text-nord-frost2">🕒</span> Recent
      </h3>
      <div class="space-y-2">
        <button
          v-for="url in history"
          :key="url"
          @click="emit('select', url)"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-nord-2/30 transition-colors flex items-center justify-between"
        >
          <span class="truncate">{{ url }}</span>
          <button
            v-if="!bookmarks.includes(url)"
            @click.stop="toggleBookmark(url)"
            class="text-nord-snow0/30 hover:text-nord-frost1"
          >
            ⭐
          </button>
        </button>
      </div>
    </div>
  </div>
</template>