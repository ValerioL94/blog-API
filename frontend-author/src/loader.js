const getRequest = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};

export async function fetchPosts() {
  try {
    const posts = await getRequest('http://localhost:3000/blog/posts');
    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchPost(postid) {
  try {
    const post = await getRequest('http://localhost:3000/blog/posts/' + postid);
    return post;
  } catch (error) {
    throw new Error(error.message);
  }
}
