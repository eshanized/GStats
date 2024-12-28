<script setup lang="ts">
import { generateShareableLink, exportToJSON } from '../utils/export';

const props = defineProps<{
  data: any;
}>();

const copyLink = async () => {
  const link = generateShareableLink(props.data);
  await navigator.clipboard.writeText(link);
};

const downloadJSON = () => {
  exportToJSON(props.data);
};
</script>

<template>
  <div class="flex gap-3">
    <button
      @click="copyLink"
      class="px-4 py-2 rounded-lg bg-nord-2/50 hover:bg-nord-2/70 transition-colors flex items-center gap-2"
    >
      <span>🔗</span>
      <span>Share</span>
    </button>
    <button
      @click="downloadJSON"
      class="px-4 py-2 rounded-lg bg-nord-2/50 hover:bg-nord-2/70 transition-colors flex items-center gap-2"
    >
      <span>💾</span>
      <span>Export</span>
    </button>
  </div>
</template>