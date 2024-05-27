import { useMemo, useState } from 'react';
import { AuthContext } from './context';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(null);

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
