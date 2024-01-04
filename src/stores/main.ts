import { defineStore } from 'pinia';

const useMainStore = defineStore('main', {
  state: () => ({
    showPostUpload: false,
    showPostDetails: false,
  }),
  actions: {
    changeShowPostUpload(payload: boolean) {
      this.showPostUpload = payload;
    },
    changeShowPostDetails(payload: boolean) {
      this.showPostDetails = payload;
    },
  },
  getters: {
  },
});

export default useMainStore;
