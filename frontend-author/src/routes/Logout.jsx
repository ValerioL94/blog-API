import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/context';
import { useEffect } from 'react';
export default function Logout() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setToken();
      navigate('/home', { replace: true });
    }, 1000);
  }, [setToken, navigate]);

  return (
    <div className="wrapper">
      <h1>Logout Page</h1>
      <p>Logging out...</p>
    </div>
  );
}
