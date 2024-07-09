export function setLocalStorage(key: string, value: any) {
  if(value.length > 10) {
    value.shift();
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string): any {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  else return null;
}