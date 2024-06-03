const postRequest = async (url, data) => {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};

const authRequest = async (url, method, data, token) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(data),
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
    const response = await postRequest(endpoint, payload);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postAction(request, params, token) {
  const method = request.method;
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  let endpoint;
  if (method === 'POST') endpoint = `/blog/posts`;
  if (method === 'PUT' || method === 'DELETE')
    endpoint = `/blog/posts/${params.postid}`;
  try {
    const response = await authRequest(endpoint, method, payload, token.token);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
