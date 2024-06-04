const server = process.env.BACKEND_API;
const postRequest = async (url, formData) => {
  const response = await fetch(`${server}${url}`, {
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
  const id = params.postid;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  try {
    const data = await postRequest(`/blog/posts/${id}/comments`, payload);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
