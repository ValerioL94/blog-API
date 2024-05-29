import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(null);

  useEffect(() => {
    function handleExp() {
      setToken();
      <Navigate to={'/home'} replace={true} />;
    }
    if (token) {
      const expTime = Date.now() + token.expiresIn * 1000;
      const timeLeft = expTime - Date.now();
      setTimeout(() => {
        handleExp();
      }, timeLeft);
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
