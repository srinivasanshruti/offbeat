function setLocalStorage(key: string, value: any) {
  if (value.length > 100) {
    value.shift();
  }
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key: string): any {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  else return null;
}

export function getRecentItemsFromLocal(): null | number[] {
  return getLocalStorage('recently_viewed');
}

export function setRecentItemsToLocal(articleIdList: number[]) {
  return setLocalStorage('recently_viewed', articleIdList);
}

export function getSavedItemsFromLocal(): null | number[] {
  return getLocalStorage('saved_articles');
}

export function setSavedItemsToLocal(articleIdList: number[]) {
  return setLocalStorage('saved_articles', articleIdList);
}