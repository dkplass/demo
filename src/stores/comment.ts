import { createComment, loadComments } from '@/apis/comment';
import { defineStore } from 'pinia';
import usePostStore from './post';

export interface IComment {
  content: string
  postId: string
}

const useCommentStore = defineStore('comment', {
  state: () => ({
    list: [],
  }),
  actions: {
    /**
     * 載入評論
     * @param {array} comments An array of comments
     */
    initializeComments(comments: []) {
      this.list = comments;
    },
    /**
     * 新增評論
     * @param {string} content The content
     * @param {string} postId The post id
     */
    async addComment({ content, postId }: IComment) {
      const usePost = usePostStore();

      await createComment(content, postId);
      this.loadAllComments(postId);
      usePost.increaseCommentCount(postId);
    },
    /**
     * 讀取所有評論
     * @param {string} postId 讀取特定發文id的所有評論
     */
    async loadAllComments(postId: string) {
      const comments = await loadComments(postId);
      this.initializeComments(comments);
    },
  },
  getters: {
  },
});

export default useCommentStore;
