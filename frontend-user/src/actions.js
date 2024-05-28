const localUrl = 'http://localhost:3000/blog/posts';

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

export async function commentAction(params, request) {
  const id = params.postId;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  try {
    const data = await postRequest(`${localUrl}/${id}/comments`, payload);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
