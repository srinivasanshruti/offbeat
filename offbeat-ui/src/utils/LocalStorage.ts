function setLocalStorage(key: string, value: number[]) {
  if (value.length > 100) {
    value.shift();
  }

  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key: string): number[] | undefined {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  else return undefined;
}

export function getRecentItemsFromLocal(): number[] | undefined {
  return getLocalStorage('recently_viewed');
}

export function setRecentItemsToLocal(articleIdList: number[]) {
  return setLocalStorage('recently_viewed', articleIdList);
}

export function getSavedItemsFromLocal(): number[] | undefined {
  return getLocalStorage('saved_articles');
}

export function setSavedItemsToLocal(articleIdList: number[]) {
  return setLocalStorage('saved_articles', articleIdList);
}
