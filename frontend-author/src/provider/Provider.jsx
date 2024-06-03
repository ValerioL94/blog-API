import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';

const checkTokenValidity = (token) => {
  if (!token) return false;
  const expirationTime = JSON.parse(atob(token.token.split('.')[1])).exp * 1000;
  return Date.now() < expirationTime;
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  function handleExpiredToken() {
    localStorage.removeItem('token');
    setToken();
  }
  useEffect(() => {
    if (token && checkTokenValidity(token)) {
      localStorage.setItem('token', JSON.stringify(token));
      const expirationTime =
        JSON.parse(atob(token.token.split('.')[1])).exp * 1000;
      const timeUntilExpiration = expirationTime - Date.now();
      setTimeout(handleExpiredToken, timeUntilExpiration);
    } else {
      handleExpiredToken();
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
