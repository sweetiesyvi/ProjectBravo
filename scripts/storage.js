// storage.js — small wrapper for localStorage
export const storage = {
  get(key, fallback = null){
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch(e){
      console.warn('storage.get failed', e);
      return fallback;
    }
  },
  set(key, value){
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e){
      console.warn('storage.set failed', e);
    }
  },
  remove(key){ localStorage.removeItem(key); }
};
