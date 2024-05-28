import { Form, useActionData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../provider/context';

export default function Login() {
  const { token, setToken } = useAuth();
  const response = useActionData();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
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
        email: '',
        password: '',
      });
      setErrors([]);
      setToken(response);
      navigate('/home', { replace: true });
    }
  }, [response, navigate, setToken]);

  return (
    <div className="wrapper">
      {!token ? (
        <div className="form-wrapper">
          <h1>Log-in</h1>
          <Form className="form-group" method="post">
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
              placeholder="current password"
              autoComplete="current-password"
              required
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
      ) : (
        <h1>Already logged in </h1>
      )}
    </div>
  );
}
