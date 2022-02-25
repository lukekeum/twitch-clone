export default class LocalStorage {
  static get(key: string): string | null {
    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }
    return value;
  }

  static set(key: string, value: any): void {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, val);
  }

  static delete(key: string): void {
    localStorage.removeItem(key);
  }
}
