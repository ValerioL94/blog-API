const getRequest = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};

export async function postsLoader() {
  try {
    const data = await getRequest('/blog/posts');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postLoader(params) {
  const id = params.postid;
  try {
    const data = await getRequest(`/blog/posts/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function commentLoader(params) {
  try {
    const data = await getRequest(
      `blog/posts/${params.postid}/comments/${params.commentid}`
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
