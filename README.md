# Portfolio

Wymaga Node.js 22.12 lub nowszego.

```sh
npm ci
npm run dev
npm run build
```

Projekty, narzędzia i adres kontaktowy są w `src/content.js`. Aby pokazać zdjęcia w szczegółach projektu, umieść je w `public/media` i dodaj ścieżki do jego pola `images`.

Wersja produkcyjna powstaje w `dist/`. Workflow GitHub Pages buduje i publikuje ten katalog po zmianie na gałęzi `main`.

Starsze adresy w formacie `#/projekty/:id` nadal otwierają właściwy projekt. Linki do obecnych sekcji i projektów używają kotwic, np. `#projekty` i `#pcsk225`.

Testy przed publikacją:

```sh
npm run build
npx playwright install chromium
npm run test:smoke
```
