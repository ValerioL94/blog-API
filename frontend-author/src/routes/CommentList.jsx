import { useLoaderData, Form, useActionData, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';

export default function CommentList() {
  const response = useActionData();
  const { post, commentsInPost } = useLoaderData();
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
  }, [response, post]);
  return (
    <div className="wrapper">
      <h1>{post.title} - Comments</h1>
      <div className="comments-wrapper">
        {!commentsInPost.length && <p>There are no comments.</p>}
        {commentsInPost &&
          sortedComments.map((comment) => (
            <Comment key={comment._id} data={comment} />
          ))}
      </div>
      <div className="form-wrapper">
        <h3>Add comment</h3>
        <Form className="form-group" method="post">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            onChange={handleChange}
            value={comment.username}
            placeholder="John Doe"
            autoComplete="username"
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
      <button
        style={{ alignSelf: 'flex-end', margin: '10px' }}
        type="button"
        className="form-submit"
        onClick={() => (document.documentElement.scrollTop = 0)}
      >
        Top &#8679;
      </button>
    </div>
  );
}
