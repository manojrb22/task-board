const CREDENTIALS = {
  email: 'intern@demo.com',
  password: 'intern123',
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const { email, password, rememberMe } = action.payload;
      if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
        return {
          ...state,
          isAuthenticated: true,
          user: { email },
          rememberMe,
          error: null,
        };
      }
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: 'Invalid email or password',
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        rememberMe: false,
        error: null,
      };

    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        rememberMe: action.payload.rememberMe,
      };

    default:
      return state;
  }
};

export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  rememberMe: false,
  error: null,
};
