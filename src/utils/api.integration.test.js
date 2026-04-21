// ============================================================================
// INTEGRATION TEST: utils/api.js — stvarno pozivanje api.login()
// ============================================================================
// Ovo je integration test: testiramo api.login() koji iznutra zove nasu
// request() funkciju, koja zove fetch(). Pratimo ceo lanac, ali `fetch`
// mock-ujemo da ne bismo stvarno pogadjali backend (testovi moraju da rade
// offline i brzo).
// ============================================================================

import { api, setToken } from './api';

// Pomocna funkcija — vraca lazni "Response" objekat koji fetch() vraca.
function mockResponse(body, { status = 200, ok = true } = {}) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('api.login', () => {
  test('salje POST na /api/360/auth/login sa JSON telom', async () => {
    // Arrange — kazemo fetch-u sta da vrati kad ga neko pozove.
    global.fetch.mockReturnValueOnce(
      mockResponse({ token: 'abc123', user: { role: 'admin' } })
    );

    // Act
    const result = await api.login({ username: 'jana', password: 'tajna' });

    // Assert — proveravamo i ulaz (kako je fetch pozvan) i izlaz (rezultat).
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toContain('/api/360/auth/login');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({ username: 'jana', password: 'tajna' });
    expect(result).toEqual({ token: 'abc123', user: { role: 'admin' } });
  });

  test('baca gresku kada backend vrati 401', async () => {
    global.fetch.mockReturnValueOnce(mockResponse({}, { status: 401, ok: false }));

    // api throw-uje "Invalid credentials" za 401 bez role parametra.
    await expect(api.login({ username: 'x', password: 'y' }))
      .rejects.toThrow('Invalid credentials');
  });
});

describe('api.manager.getDashboard', () => {
  test('salje Authorization header kada je admin token postavljen', async () => {
    // Arrange
    setToken('admin', 'admin-jwt-token');
    global.fetch.mockReturnValueOnce(mockResponse({ campaigns: [] }));

    // Act
    await api.manager.getDashboard();

    // Assert — proveravamo da je Bearer token stigao u header.
    const [, options] = global.fetch.mock.calls[0];
    expect(options.headers.Authorization).toBe('Bearer admin-jwt-token');
  });
});
