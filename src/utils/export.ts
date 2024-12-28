export function generateShareableLink(repoData: any) {
  const params = new URLSearchParams({
    repo: repoData.repository.full_name,
    stats: JSON.stringify(repoData.codeStats)
  });
  return `${window.location.origin}?${params.toString()}`;
}

export function exportToJSON(repoData: any) {
  const blob = new Blob([JSON.stringify(repoData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${repoData.repository.name}-analysis.json`;
  a.click();
  URL.revokeObjectURL(url);
}