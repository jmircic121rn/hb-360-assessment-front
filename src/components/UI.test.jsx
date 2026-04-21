// ============================================================================
// UNIT TEST: UI komponente (Btn, Alert)
// ============================================================================
// Ovde koristimo React Testing Library — biblioteku koja "renderuje"
// komponente u laznom browser-u (jsdom) i omogucava nam da ih testiramo
// onako kako ih korisnik vidi: sto je tekst, da li je dugme onemoguceno, itd.
// ============================================================================

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Btn, Alert } from './UI';

describe('Btn', () => {
  test('prikazuje tekst koji smo prosledili kao children', () => {
    render(<Btn>Sacuvaj</Btn>);

    // getByRole pronalazi dugme po ulozi (sto je dobro za pristupacnost).
    expect(screen.getByRole('button', { name: /sacuvaj/i })).toBeInTheDocument();
  });

  test('poziva onClick kada korisnik klikne', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn(); // "spy" funkcija — pamti da li je pozvana.

    render(<Btn onClick={onClick}>Klikni me</Btn>);
    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('ne poziva onClick kada je loading (dugme je disabled)', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Btn loading onClick={onClick}>Sacuvaj</Btn>);
    await user.click(screen.getByRole('button'));

    // Dugme je disabled dok traje loading, pa klik ne sme da prodje.
    expect(screen.getByRole('button')).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Alert', () => {
  test('prikazuje poruku koju smo prosledili', () => {
    render(<Alert type="error">Pogresan password</Alert>);

    expect(screen.getByText('Pogresan password')).toBeInTheDocument();
  });
});
