import { Form, useActionData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../provider/context';
import { v4 as uuidv4 } from 'uuid';

export default function NewPost() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const response = useActionData();
  const [post, setPost] = useState({
    title: '',
    content: '',
    published: 'false',
    author: token.id,
  });
  const [errors, setErrors] = useState([]);
  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    if (response && response.errors) {
      setErrors(response.errors);
    }
    if (response && !response.errors) {
      setPost({
        title: '',
        content: '',
        published: 'false',
        author: token.id,
      });
      setErrors([]);
      navigate('/posts', { replace: true });
    }
  }, [response, navigate, token.id]);
  return (
    <div className="wrapper">
      <h1>New Post</h1>
      <div className="form-wrapper">
        <Form method="post">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            onChange={handleChange}
            value={post.title}
            required
          />
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            id="content"
            rows="20"
            className="form-control"
            onChange={handleChange}
            value={post.content}
            required
          ></textarea>
          <label htmlFor="published">Publish:</label>
          <select
            name="published"
            id="published"
            className="form-control"
            onChange={handleChange}
            value={post.published}
            required
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <input type="hidden" name="author" id="author" value={token.id} />
          <button type="submit" className="form-submit">
            Submit
          </button>
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
    </div>
  );
}
