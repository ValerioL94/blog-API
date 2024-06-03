import { Form, useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../provider/context';
import { v4 as uuidv4 } from 'uuid';

export default function NewPost() {
  const { token } = useAuth();
  const submit = useSubmit();
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
      navigate('/posts', { replace: true });
    }
  }, [response, navigate]);
  return (
    <div className="wrapper">
      <h1>New Post</h1>
      <div className="form-wrapper">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            submit(post, { method: 'post' });
          }}
        >
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
            style={{ resize: 'vertical' }}
            name="content"
            id="content"
            rows="20"
            className="form-control"
            onChange={handleChange}
            value={post.content}
            required
          ></textarea>
          <label htmlFor="published">Published:</label>
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
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            name="author"
            id="author"
            className="form-control"
            value={token.username}
            disabled
          />
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
