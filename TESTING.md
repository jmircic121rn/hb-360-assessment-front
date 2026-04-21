# Testing Guide

Kratak vodič za pisanje i pokretanje testova u Compass frontend projektu.

## Kako pokrenuti testove

```bash
# Watch mode — pokrece se stalno, ponovo izvrsava testove kad menjas fajlove.
# Najkorisnije dok aktivno pises kod.
npm test

# CI mode — pokrene sve testove jednom i zavrsi. Za build pipeline-ove.
npm run test:ci

# Pokreni samo jedan test fajl
npm test -- src/utils/api.test.js

# Pokreni samo testove cije ime sadrzi "login"
npm test -- -t "login"
```

## Tehnologije

- **Jest** — test runner (dolazi sa `react-scripts`).
- **React Testing Library** — renderuje React komponente u jsdom (lazni browser) i pruza helper-e za interakciju.
- **@testing-library/user-event** — simulira pravog korisnika (kucanje, klikovi) umesto niskonivojskih DOM event-a.
- **@testing-library/jest-dom** — dodatni matcher-i kao `.toBeInTheDocument()`.

Konfiguracija je u `src/setupTests.js` (automatski se ucitava pre svakog testa).

## Struktura test fajlova

Testovi zive pored koda koji testiraju, sa sufiksom `.test.js` ili `.test.jsx`:

```
src/
├── utils/
│   ├── api.js
│   ├── api.test.js              ← unit testovi
│   └── api.integration.test.js  ← integration testovi
├── components/
│   ├── UI.jsx
│   └── UI.test.jsx
└── pages/
    └── auth/
        ├── LoginPages.jsx
        └── LoginPages.test.jsx
```

Jest automatski pronalazi sve `*.test.js(x)` fajlove — nista dodatno ne treba da se konfigurise.

## Tri tipa testova (u ovom projektu)

### 1. Unit test — testira jednu funkciju ili komponentu u izolaciji

Primer: `src/utils/api.test.js` testira `setToken`/`clearToken` direktno, bez React-a,
bez API-ja, bez niceg drugog.

### 2. Komponentni test — renderuje jednu komponentu i testira kako reaguje

Primer: `src/components/UI.test.jsx` renderuje `<Btn>` i proverava da li se prikazuje,
da li poziva `onClick`, da li je disabled kad treba.

### 3. Integration test — testira vise delova zajedno

Primer: `src/pages/auth/LoginPages.test.jsx` testira ceo login flow:
forma + API poziv + redirect. API je mock-ovan (ne gadjamo pravi backend), ali sve
ostalo se dogadja onako kako bi se dogodilo u browser-u.

## Osnovni obrazac testa (AAA)

```javascript
test('opis onoga sto testiramo', () => {
  // Arrange — pripremi pocetno stanje
  const data = { ime: 'Jana' };

  // Act — izvrsi akciju koju testiras
  const result = nekaFunkcija(data);

  // Assert — proveri da je izlaz onakav kakav ocekujes
  expect(result).toBe('Jana');
});
```

## Korisni matcher-i

```javascript
expect(value).toBe(expected);                    // === poredjenje
expect(obj).toEqual({ a: 1 });                   // duboko poredjenje objekata
expect(fn).toHaveBeenCalledWith(arg1, arg2);     // spy funkcija je pozvana sa X
expect(fn).toHaveBeenCalledTimes(2);             // spy je pozvan 2 puta
expect(element).toBeInTheDocument();             // DOM element postoji
expect(element).toBeDisabled();                  // input/dugme je disabled
expect(element).toHaveTextContent('neki tekst'); // element sadrzi tekst
expect(promise).rejects.toThrow('error message');// async funkcija baca gresku
```

## Mock-ovanje

**Mock fetch** (globalno, vec je podeseno u `setupTests.js`):

```javascript
global.fetch.mockReturnValueOnce(
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ data: 'moj odgovor' }),
  })
);
```

**Mock celog modula** (npr. `utils/api`):

```javascript
jest.mock('../../utils/api', () => ({
  api: { login: jest.fn() },
  setToken: jest.fn(),
}));
```

**Mock jedne funkcije** (spy):

```javascript
const onClick = jest.fn();
render(<Button onClick={onClick}>Click</Button>);
// ... klik ...
expect(onClick).toHaveBeenCalledTimes(1);
```

## Pronalazenje elemenata (React Testing Library)

Po prioritetu (od najboljeg ka manje dobrom):

```javascript
screen.getByRole('button', { name: /sign in/i });     // po ARIA ulozi
screen.getByLabelText(/username/i);                   // po label-u forme
screen.getByPlaceholderText(/enter username/i);       // po placeholder-u
screen.getByText(/welcome/i);                         // po tekstu
screen.getByTestId('my-element');                     // po data-testid (poslednja opcija)
```

Varijante:
- `getBy*` — baca grešku ako ne nadje (sinhrono).
- `queryBy*` — vraca `null` ako ne nadje (za proveru "NE postoji").
- `findBy*` — async, ceka da se element pojavi (za stvari koje se pojave posle API poziva).

## Tips za pisanje novih testova

1. **Test treba da bude nezavisan.** Ne oslanjaj se na stanje iz drugih testova.
   `setupTests.js` cisti `localStorage` i mock-ove izmedju svakog testa.

2. **Testiraj ponasanje, ne implementaciju.** Umesto "proveri da se poziva
   setUsername funkcija", radije "proveri da se nakon kucanja input menja".

3. **Dajte testovima opisna imena.** "trebalo bi da prikaze error kada backend
   vrati 401" je bolje od "test 3".

4. **Kad nesto pukne u produkciji, napisi test koji bi ga uhvatio.** Tako
   regresije (isti bug koji se vraca) ne mogu tiho da se provuku nazad.

## CI/CD (za buduce)

Trenutno testove pokreces ručno. Kada bude vreme za automatizaciju, dodati
GitHub Actions workflow koji pokrece `npm run test:ci` na svaki push / pull request.
