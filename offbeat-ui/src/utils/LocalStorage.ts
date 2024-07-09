function setLocalStorage(key: string, value: any) {
  if(value.length > 10) {
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