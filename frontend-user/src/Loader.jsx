import { fetchPosts, fetchPost, sendComment } from './posts';

export async function postsLoader() {
  const posts = await fetchPosts();
  return { posts };
}

export async function postLoader({ params }) {
  const postData = await fetchPost(params.postId);
  const { commentsInPost, post } = postData;
  return { commentsInPost, post };
}

export async function commentAction({ params, request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  const response = await sendComment(params.postId, payload);
  return response;
}
