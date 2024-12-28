import { ref } from 'vue';

export function useRepositoryHistory() {
  const history = ref<string[]>(JSON.parse(localStorage.getItem('repoHistory') || '[]'));
  const bookmarks = ref<string[]>(JSON.parse(localStorage.getItem('repoBookmarks') || '[]'));

  const addToHistory = (url: string) => {
    history.value = [url, ...history.value.filter(u => u !== url)].slice(0, 10);
    localStorage.setItem('repoHistory', JSON.stringify(history.value));
  };

  const toggleBookmark = (url: string) => {
    if (bookmarks.value.includes(url)) {
      bookmarks.value = bookmarks.value.filter(u => u !== url);
    } else {
      bookmarks.value = [url, ...bookmarks.value];
    }
    localStorage.setItem('repoBookmarks', JSON.stringify(bookmarks.value));
  };

  return {
    history,
    bookmarks,
    addToHistory,
    toggleBookmark
  };
}