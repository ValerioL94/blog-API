const localUrl = '/blog/posts';

const getRequest = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};

export async function postsLoader() {
  try {
    const data = await getRequest(localUrl);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postLoader(params) {
  const id = params.postId;
  try {
    const data = await getRequest(`${localUrl}/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
