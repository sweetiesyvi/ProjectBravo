// storage.js — small wrapper for localStorage
export const storage = {
  get: function(key, fallback = null){
	  
	  const item = localStorage.getItem(key);
    if(item) {
      return JSON.parse(item);
    } else{
      console.warn('storage.get failed', e);
      return fallback;
    }
  },
  set(key, value){
      localStorage.setItem(key, JSON.stringify(value));
	  
      console.warn('storage.set failed', e);
  },
  remove(key){ localStorage.removeItem(key); }
};
