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

export async function userAction(request, path) {
  const endpoint = `/blog/users/${path}`;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  try {
    const data = await postRequest(endpoint, payload);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
