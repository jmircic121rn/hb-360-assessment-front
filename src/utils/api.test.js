// ============================================================================
// UNIT TEST: utils/api.js — funkcije za rad sa tokenima
// ============================================================================
// Ovo je najjednostavniji tip testa: uzmemo jednu "cistu" funkciju,
// pozovemo je sa odredjenim ulazom, i proverimo da li je izlaz onakav
// kakav ocekujemo. Nema UI-ja, nema API poziva — samo logika.
// ============================================================================

import { setToken, clearToken } from './api';

describe('Token helpers', () => {
  test('setToken upisuje token u localStorage pod pravim kljucem', () => {
    // Act (izvrsi akciju koju testiramo)
    setToken('admin', 'my-secret-token');

    // Assert (proveri da je stanje ono koje ocekujemo)
    expect(localStorage.getItem('compass_token_admin')).toBe('my-secret-token');
  });

  test('setToken koristi razlicite kljuceve za razlicite role', () => {
    setToken('admin', 'admin-token');
    setToken('employee', 'employee-token');

    // Svaka rola ima svoj token — ne smeju da se pobrkaju.
    expect(localStorage.getItem('compass_token_admin')).toBe('admin-token');
    expect(localStorage.getItem('compass_token_employee')).toBe('employee-token');
  });

  test('clearToken brise tacno odredjeni token, a ne druge', () => {
    // Arrange (pripremi pocetno stanje)
    setToken('admin', 'admin-token');
    setToken('employee', 'employee-token');

    // Act
    clearToken('admin');

    // Assert
    expect(localStorage.getItem('compass_token_admin')).toBeNull();
    expect(localStorage.getItem('compass_token_employee')).toBe('employee-token');
  });
});
