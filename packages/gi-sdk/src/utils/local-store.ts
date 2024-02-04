class BrowserStore {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      return localStorage.getItem(key);
    }
  }
}

export const LocalStore = new BrowserStore();
