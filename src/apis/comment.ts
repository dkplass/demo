import { request } from '../utils/request';

/**
 * 留言
 * @param {string} content 留言內容
 * @param {string} postId 發文id
 */
export async function createComment(content: string, postId: string) {
  await request('/api/comments', {
    method: 'POST',
    body: {
      data: {
        content,
        post: postId,
      },
    },
  });
}

/**
 * 載入評論
 * @param {string} postId 發文id
 * @returns {object} post object with postId parameter set to post object value
 */
export async function loadComments(postId: string) {
  if (!postId) return [];
  const response = await request(
    `/api/comments?populate=*&filters[post][id][$eq]=${postId}`,
    null,
  );

  return response.data.map((comment: any) => {
    const result = comment?.attributes;
    return {
      id: comment?.id,
      content: result?.content,
      pubDate: result?.publishedAt,
      user: {
        id: result?.user?.data?.id,
        ...result?.user?.data?.attributes,
      },
    };
  });
}
