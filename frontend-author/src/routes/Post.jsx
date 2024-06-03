import {
  useLoaderData,
  Link,
  useSubmit,
  Form,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Post() {
  const { post } = useLoaderData();
  const [edit, setEdit] = useState(false);
  const response = useActionData();
  const [errors, setErrors] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    title: post.title,
    content: post.content,
    published: post.published,
    author: post.author._id,
    _id: post._id,
  });
  const navigate = useNavigate();
  const submit = useSubmit();
  function handleChange(e) {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    if (response && response.errors) {
      setErrors(response.errors);
    }
    if (response && !response.errors) {
      navigate('/posts', { replace: true });
    }
  }, [response, navigate]);
  return (
    <div className="wrapper">
      {edit ? (
        <>
          <h1>Update Post</h1>
          <div className="form-wrapper">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submit(updatedPost, { method: 'put' });
              }}
            >
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                onChange={handleChange}
                value={updatedPost.title}
                required
              />
              <label htmlFor="content">Content:</label>
              <textarea
                style={{ resize: 'vertical' }}
                name="content"
                id="content"
                rows="20"
                className="form-control"
                onChange={handleChange}
                value={updatedPost.content}
                required
              ></textarea>
              <label htmlFor="published">Published:</label>
              <select
                name="published"
                id="published"
                className="form-control"
                onChange={handleChange}
                value={updatedPost.published}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                disabled
                name="author"
                id="author"
                className="form-control"
                value={post.author.username}
              />
              <div
                style={{
                  display: 'flex',
                  margin: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <button type="submit" className="form-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="form-submit"
                  onClick={() => {
                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
            {errors ? (
              <ul>
                {errors.map((error) => (
                  <li className="errors-list" key={uuidv4()}>
                    {error.msg}
                  </li>
                ))}
              </ul>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <>
          <h1>{post.title}</h1>
          <div className="post-fullview">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>
                <strong>Author: </strong>
                {post.author.username}
              </p>
              <p>
                <strong>Created: </strong>
                {new Date(post.createdAt).toLocaleString()}{' '}
              </p>
              <p>
                <strong>Last updated: </strong>
                {new Date(post.updatedAt).toLocaleString()}
              </p>
            </div>
            <p>{post.content}</p>
          </div>
          <div
            style={{
              display: 'flex',
              margin: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              type="button"
              className="form-submit"
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </button>
          </div>
          <hr style={{ width: '100%' }} />
          <div
            style={{
              display: 'flex',
              margin: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link to={'comments'}>Go to post&apos;s comments</Link>
            <button
              type="button"
              className="form-submit"
              onClick={() => (document.documentElement.scrollTop = 0)}
            >
              Top &#8679;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
