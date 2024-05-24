import { useLoaderData, Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Post() {
  const navigate = useNavigate();
  const { commentsInPost, post } = useLoaderData();
  const sortedComments = commentsInPost.sort((a, b) => {
    let aDate = new Date(a.createdAt);
    let bDate = new Date(b.createdAt);
    return bDate - aDate;
  });
  const url = `http://localhost:3000/blog/posts/${post._id}/comments`;
  const [comment, setComment] = useState({
    username: '',
    content: '',
  });
  const [errors, setErrors] = useState([]);
  function handleChange(e) {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      };
      const response = await fetch(url, requestData);
      const data = await response.json();
      if (data.errors && data.errors.length > 0) {
        setErrors(data.errors);
      } else {
        navigate(`/posts/${post._id}`);
        setComment({
          username: '',
          content: '',
        });
        setErrors([]);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <div className="wrapper">
      <h1>{post.title}</h1>
      <div className="post-fullview">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>
            <strong>Author: </strong>
            {post.author.username}
          </p>
          <p>
            <strong>Date: </strong>
            {new Date(post.createdAt).toLocaleString()}{' '}
          </p>
        </div>
        <p>{post.content}</p>
        <p>
          Leave a comment below or write to my fake email{' '}
          <strong style={{ color: 'blue' }}>{post.author.email}</strong> .
        </p>
      </div>
      <div className="comments-wrapper">
        <h3>Comments</h3>
        {!commentsInPost.length && <p>There are no comments.</p>}
        {commentsInPost &&
          sortedComments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.username}</strong>
              </p>
              <p>{comment.content}</p>
              <p>{new Date(comment.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))}
      </div>
      <div className="form-wrapper">
        <h3>Add comment</h3>
        <Form onSubmit={handleSubmit} className="form-group" method="post">
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            id="username"
            className="form-control"
            type="text"
            onChange={handleChange}
            value={comment.username}
            placeholder="John Doe"
            required
          />
          <label htmlFor="content">Comment: </label>
          <textarea
            style={{ resize: 'none' }}
            name="content"
            id="content"
            className="form-control"
            rows="5"
            value={comment.content}
            onChange={handleChange}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit efficitur lacus nec fermentum. Sed nisl mauris, dapibus aliquam leo at, efficitur blandit diam."
            maxLength={300}
            required
          ></textarea>
          <button className="form-submit" type="submit">
            Send
          </button>
        </Form>
        {errors && (
          <ul>
            {errors.map((error) => (
              <li className="errors-list" key={error.path}>
                {error.msg}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Post;
