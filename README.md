# Raftul — catalog de cărți

Proiect React pentru exersarea rutării cu React Router. Include pagină principală,
listă de cărți cu căutare în URL, detalii de carte cu rută dinamică, favorite
păstrate în browser, pagină Despre și rută 404.

## Pornire

```bash
npm install
npm run dev
```

Build de producție: `npm run build`.

## Concepte React Router folosite

- `BrowserRouter`, `Routes` și `Route` pentru definirea paginilor.
- `Layout` și `Outlet` pentru navigare comună.
- `Link` și `NavLink` pentru navigare fără reîncărcarea paginii.
- `useParams` pentru ruta dinamică `/carti/:id`.
- `useSearchParams` pentru căutarea partajabilă `/carti?q=...`.
- `useNavigate` pentru revenirea din pagina 404.
- Ruta `*` pentru URL-urile necunoscute.

Datele demo și cărțile se află în `src/data/books.js`.
