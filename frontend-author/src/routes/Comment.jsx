import { useSubmit, Form, useActionData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable react/prop-types */
export default function Comment({ data }) {
  const [edit, setEdit] = useState(false);
  const response = useActionData();
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
      setErrors([]);
      setTimeout(() => {
        setComment({ username: '', content: '' });
        setEdit(false);
      }, 100);
    }
  }, [response]);
  const submit = useSubmit();
  return (
    <>
      {edit ? (
        <>
          <Form className="form-group" method="put">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              onChange={handleChange}
              value={comment.username}
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
              maxLength={300}
              required
            ></textarea>
            <input type="hidden" name="id" value={data._id} />
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
                  setComment({
                    username: '',
                    content: '',
                  });
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
        </>
      ) : (
        <div className="comment">
          <p>
            <strong>{data.username}</strong>
          </p>
          <p>{data.content}</p>
          <p>{new Date(data.createdAt).toLocaleString()}</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              type="button"
              className="form-submit"
              onClick={() => {
                setEdit(true);
                setComment({
                  username: data.username,
                  content: data.content,
                });
              }}
            >
              Edit
            </button>
            <button
              type="submit"
              className="form-submit"
              onClick={(e) => {
                e.preventDefault();
                submit({ id: data._id }, { method: 'delete' });
              }}
            >
              Delete
            </button>
          </div>
          <hr />
        </div>
      )}
    </>
  );
}
