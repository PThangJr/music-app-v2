const storage = (key) => {
  return {
    get() {
      return JSON.parse(localStorage.getItem(key));
    },
    set(value) {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.removeItem(key);
      }
    },
    remove() {
      localStorage.removeItem(key);
    },
  };
};

// const storage = {
//   get(key) {
//     return JSON.parse(localStorage.getItem(key));
//   },
//   set(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
//   },
//   remove(key, value) {
//     localStorage.removeItem(key);
//   },
// };

// storage1.get()
export default storage;
