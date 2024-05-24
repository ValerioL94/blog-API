import { fetchPosts, fetchPost } from './loader.js';

export async function postsLoader() {
  const posts = await fetchPosts();
  return { posts };
}

export async function postLoader(req) {
  const postData = await fetchPost(req.params.postId);
  const { commentsInPost, post } = postData;
  return { commentsInPost, post };
}
