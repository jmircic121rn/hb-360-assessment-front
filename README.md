# HB Compass – Frontend

React frontend za 360° leadership assessment platformu.

## Struktura stranica

```
/ ────────────────── Landing page (publična)
/assess/:token ──── Forma za popunjavanje assessmenta
/manager/login ──── Login za managere
/manager/dashboard  Dashboard managera
/manager/employees  Lista zaposlenih (CRUD)
/manager/employees/new  Dodaj zaposlenog
/manager/employees/:id/edit  Izmeni zaposlenog
/manager/cycles/new    Nova ciklus forma
/manager/cycles/:id    Detalj ciklusa + linkovi
/manager/reports        Lista reporta
/employee/login ──── Login za zaposlene
/employee/dashboard  Status i linkovi
/employee/reports    Download reporta
/admin/login ─────── Admin login
/admin/cycles ─────── Lista svih ciklusa + generisanje reporta
/admin/group-report   Grupni report
```

## Pokretanje

```bash
npm install
REACT_APP_API_URL=https://vas-server.com npm start
```

Za production build:
```bash
npm run build
# Serve /build folder
```

## Konfiguracija

Postavite `REACT_APP_API_URL` na URL vašeg backend servera.
Ako je prazan, podrazumeva se isti origin (za proxy setup).

## API Endpoints koji se očekuju

| Metod | Path | Opis |
|-------|------|------|
| GET | /api/360/assess/:token | Učitava pitanja |
| POST | /api/360/assess/:token/submit | Submituje odgovore |
| POST | /api/360/auth/login/manager | Manager login |
| POST | /api/360/auth/login/employee | Employee login |
| POST | /api/360/auth/login/admin | Admin login |
| GET | /api/360/manager/dashboard | Dashboard stats |
| GET/POST | /api/360/manager/employees | CRUD zaposlenih |
| PUT/DELETE | /api/360/manager/employees/:id | Update/delete |
| GET/POST | /api/360/manager/cycles | Ciklusi |
| GET | /api/360/manager/cycles/:id | Detalj ciklusa |
| GET | /api/360/manager/reports | Lista reporta |
| GET | /api/360/employee/dashboard | Employee dashboard |
| GET | /api/360/employee/reports | Employee reporti |
| GET | /api/360/admin/cycles?status= | Svi ciklusi |
| POST | /api/360/admin/cycles/:id/report/1 | Generiši Report 1 |
| POST | /api/360/admin/cycles/:id/report/2 | Generiši Report 2 |
| GET | /api/360/admin/managers | Lista managera |
| POST | /api/360/admin/reports/group | Grupni report |

## Token format (JWT)

Login response: `{ token: "jwt_string", ... }`
Čuva se u localStorage kao `compass_token_manager`, `compass_token_employee`, `compass_token_admin`.
Šalje se kao `Authorization: Bearer <token>`.
# hb-360-assessment-front
