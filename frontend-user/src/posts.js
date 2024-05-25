const getRequest = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};

const postRequest = async (url, formData) => {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
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

export async function sendComment(postid, formData) {
  try {
    const response = await postRequest(
      'http://localhost:3000/blog/posts/' + postid + '/comments',
      formData
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
