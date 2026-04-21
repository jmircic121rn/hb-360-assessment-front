// Ovaj fajl se automatski ucitava pre svakog testa (CRA konvencija).
// jest-dom dodaje korisne matcher-e kao sto su .toBeInTheDocument(), .toHaveTextContent(), itd.
import '@testing-library/jest-dom';

// fetch nije dostupan u Node-ovom test okruzenju (jsdom),
// pa ga mock-ujemo globalno. Pojedinacni testovi mogu da ga override-uju.
global.fetch = jest.fn();

// Svaki test pocinje sa cistim localStorage-om i resetovanim mock-ovima.
beforeEach(() => {
  localStorage.clear();
  if (global.fetch && global.fetch.mockClear) {
    global.fetch.mockClear();
  }
});
