import {
  createPost, favorPost, likePost, loadPosts,
} from '@/apis/post';
import { defineStore } from 'pinia';
import useMainStore from './main';
import useCommentStore from './comment';

interface IPostState {
  currentId: null | string
  searchResult: []
  list: []
}

const usePostStore = defineStore('post', {
  state: (): IPostState => ({
    list: [],
    searchResult: [],
    currentId: null,
  }),
  actions: {
    initializePosts(posts: []): void {
      this.list = posts;
    },
    toggleLike({ id, isLike }: { id: string, isLike: boolean }) {
      console.log(id, isLike);
      const post: any = this.list.find((_: any) => _.id === id);
      console.log(post);
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1;
      } else {
        // eslint-disable-next-line no-plusplus
        post.liked_bies--;
      }
      post.likedByMe = isLike;
    },
    toggleFavor({ id, isFavor }: { id: string, isFavor: boolean }) {
      const post: any = this.list.find((_: any) => _.id === id);
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1;
      } else {
        // eslint-disable-next-line no-plusplus
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },
    setCurrentId(id: string | null) {
      this.currentId = id;
    },
    increaseCommentCount(id: string) {
      const post: any = this.list.find((_: any) => _.id === id);
      // eslint-disable-next-line no-plusplus
      post.comments++;
    },
    setPostsSearchResult(posts: []) {
      this.searchResult = posts;
    },
    async uploadPost({ image, description }: { image: any, description: string }) {
      const useMain = useMainStore();
      await createPost(image, description);
      this.loadAllPosts();
      // 關閉彈窗並清空圖片
      useMain.changeShowPostUpload(false);
    },
    async loadAllPosts() {
      const posts = await loadPosts();
      this.initializePosts(posts);
    },
    async syncToggleLike(id: string) {
      const isLike = await likePost(id);
      this.toggleLike({ id, isLike });
    },
    async syncToggleFavor(id: string) {
      const isFavor = await favorPost(id);
      this.toggleFavor({ id, isFavor });
    },
    async showPostDetails(id: string) {
      const useComment = useCommentStore();
      const useMain = useMainStore();
      this.setCurrentId(id);
      useComment.loadAllComments(id);
      useMain.changeShowPostDetails(true);
    },
    async hidePostDetails() {
      const useMain = useMainStore();
      this.setCurrentId(null);
      useMain.changeShowPostDetails(false);
    },
    async searchPosts(term: string) {
      const posts = await loadPosts(
        `filters[description][$contains]=${term}`,
      );
      this.setPostsSearchResult(posts);
    },
  },
  getters: {
    postDetails(state) {
      return state.list.find((_: any) => _.id === state.currentId);
    },
  },
});

export default usePostStore;
