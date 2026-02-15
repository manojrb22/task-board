import { createContext, useReducer, useEffect, useContext } from 'react';
import { authReducer, initialAuthState } from '../reducers/authReducer';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const { isAuthenticated, user, rememberMe } = JSON.parse(savedAuth);
        if (rememberMe) {
          dispatch({ type: 'INITIALIZE', payload: { isAuthenticated, user, rememberMe } });
        }
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  useEffect(() => {
    if (state.isAuthenticated && state.rememberMe) {
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        rememberMe: state.rememberMe,
      }));
    } else {
      localStorage.removeItem('auth');
    }
  }, [state.isAuthenticated, state.user, state.rememberMe]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
