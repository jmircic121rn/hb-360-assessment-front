// ============================================================================
// INTEGRATION TEST: Login flow
// ============================================================================
// Ovaj test simulira pravog korisnika: unosi username i password, klikne
// dugme "Sign In", i proverava da je zvan api.login() i da je korisnik
// preusmeren na pravu stranicu nakon login-a.
//
// Mock-ujemo:
//   - utils/api (da ne bismo stvarno gadjali backend)
//   - react-router-dom useNavigate (da bismo videli na kom URL-u smo zavrsili)
// ============================================================================

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Mock-ujemo ceo API modul PRE nego sto se import-uje komponenta.
jest.mock('../../utils/api', () => ({
  api: { login: jest.fn() },
  setToken: jest.fn(),
}));

// Mock-ujemo useNavigate da bismo mogli da verifikujemo redirect.
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import { UnifiedLogin } from './LoginPages';
import { api, setToken } from '../../utils/api';

function renderLogin() {
  // MemoryRouter je potreban zato sto komponenta koristi hook-ove iz router-a.
  return render(
    <MemoryRouter>
      <UnifiedLogin />
    </MemoryRouter>
  );
}

describe('UnifiedLogin', () => {
  test('uspesan login: salje kredencijale, cuva token, redirektuje na /manager/welcome', async () => {
    const user = userEvent.setup();
    // Arrange — lazni uspesan odgovor backend-a.
    api.login.mockResolvedValueOnce({
      token: 'jwt-abc',
      user: { role: 'admin', username: 'jana' },
    });

    // Act
    renderLogin();
    await user.type(screen.getByPlaceholderText(/enter username/i), 'jana');
    await user.type(screen.getByPlaceholderText(/••••••••/), 'mojaTajna');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // Assert — cekamo da se navigate desi, zatim proveravamo sve.
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/manager/welcome');
    });
    expect(api.login).toHaveBeenCalledWith({ username: 'jana', password: 'mojaTajna' });
    expect(setToken).toHaveBeenCalledWith('admin', 'jwt-abc');
    // Sacekaj da se loading state smiri da ne bi bilo React act() warning-a.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
    });
  });

  test('neuspesan login: prikazuje error poruku i ne redirektuje', async () => {
    const user = userEvent.setup();
    api.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderLogin();
    await user.type(screen.getByPlaceholderText(/enter username/i), 'jana');
    await user.type(screen.getByPlaceholderText(/••••••••/), 'pogresno');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // Error se pojavljuje u Alert komponenti.
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
    // Sacekaj da se loading state smiri da ne bi bilo React act() warning-a.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
    });
  });

  test('employee role: redirektuje na /employee/dashboard', async () => {
    const user = userEvent.setup();
    api.login.mockResolvedValueOnce({
      token: 'emp-jwt',
      user: { role: 'employee', username: 'marko' },
    });

    renderLogin();
    await user.type(screen.getByPlaceholderText(/enter username/i), 'marko');
    await user.type(screen.getByPlaceholderText(/••••••••/), 'tajna');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // waitFor ceka da se state updates zavrse (i da navigate bude pozvan).
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/employee/dashboard');
    });
    // Dodatno cekamo da se loading state smiri — izbegava React act() warning.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
    });
  });
});
