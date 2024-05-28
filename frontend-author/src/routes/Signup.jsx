import { Form, useActionData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Signup() {
  const response = useActionData();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    authorKey: '',
  });
  const [errors, setErrors] = useState([]);
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    if (response && response.errors) {
      setErrors(response.errors);
    }
    if (response && !response.errors) {
      setUser({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        authorKey: '',
      });
      setErrors([]);
      navigate('/login', { replace: true });
    }
  }, [response, navigate]);
  return (
    <div className="wrapper">
      <h1>Sign-up</h1>
      <div className="form-wrapper">
        <Form className="form-group" method="post">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            onChange={handleChange}
            value={user.username}
            placeholder="JakeTheAuthor"
            autoComplete="username"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            onChange={handleChange}
            value={user.email}
            placeholder="jackie@gmail.com"
            autoComplete="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            required
          />
          <label htmlFor="passwordConfirm">Confirm password:</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            className="form-control"
            placeholder="Same as password"
            autoComplete="new-password"
            required
          />
          <label htmlFor="authorKey">Author key:</label>
          <input
            type="password"
            name="authorKey"
            id="authorKey"
            className="form-control"
            placeholder="Enter the secret key"
            required
          />
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
    </div>
  );
}
