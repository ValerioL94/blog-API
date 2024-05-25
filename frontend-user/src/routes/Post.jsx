import { useLoaderData, Form, useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Post() {
  const response = useActionData();
  const { commentsInPost, post } = useLoaderData();
  const sortedComments = commentsInPost.sort((a, b) => {
    let aDate = new Date(a.createdAt);
    let bDate = new Date(b.createdAt);
    return bDate - aDate;
  });
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
  useEffect(() => {
    if (response && response.errors) {
      setErrors(response.errors);
    }
    if (response && !response.errors) {
      setComment({ username: '', content: '' });
      setErrors([]);
    }
  }, [response]);
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
        <Form className="form-group" method="post">
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
      <button
        style={{ alignSelf: 'flex-end', margin: '0 10px 10px 0' }}
        className="form-submit"
        onClick={() => (document.documentElement.scrollTop = 0)}
      >
        Go to top
      </button>
    </div>
  );
}

export default Post;
