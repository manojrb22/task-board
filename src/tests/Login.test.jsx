import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../components/auth/Login';

describe('Login Component', () => {
  it('should login successfully with correct credentials', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('intern@demo.com');
    const passwordInput = screen.getByPlaceholderText('intern123');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'intern@demo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'intern123' } });
    fireEvent.click(loginButton);

    // After successful login, should redirect (component unmounts)
    expect(screen.queryByText(/invalid email or password/i)).not.toBeInTheDocument();
  });

  it('should show error with incorrect credentials', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('intern@demo.com');
    const passwordInput = screen.getByPlaceholderText('intern123');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });
});
