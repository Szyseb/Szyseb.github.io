# Portfolio Sebastian Szyszło

Statyczne portfolio React + Vite dla GitHub Pages z routingiem hash (`#/...`).

## Wymagania

- Node.js >= 22.12
- npm

## Uruchomienie lokalne

```sh
npm ci --include=optional
npm run dev
```

Build produkcyjny:

```sh
npm run build
npm run preview
```

## Routing

Aplikacja działa bez przepisywania URL po stronie serwera dzięki hash routingowi:

- `#/` — strona główna
- `#/projekty` — indeks projektów
- `#/projekty/:id` — podstrona projektu
- `#/warsztat` — warsztat / o projekcie
- `#/kontakt` — kontakt

## Edycja treści i obrazów

Główne treści edytujesz w:

- `/home/runner/work/Szyseb.github.io/Szyseb.github.io/src/content.js`

Pola obrazów do uzupełnienia:

- `projects[].image` — okładka projektu
- `projects[].images[]` — dokumentacja projektu
- `workshop.portraitSlot` — portret / zdjęcie autora przy stanowisku
- `workshop.workbenchSlot` — zdjęcie stanowiska

Pliki mediów trzymaj w:

- `/home/runner/work/Szyseb.github.io/Szyseb.github.io/public/media`

Domyślne pliki SVG w `public/media` to ilustracje/placeholdery.
Puste sloty obrazów nie wysyłają żądań broken-image.

## React Bits

Wersje komponentów React Bits są vendored w:

- `/home/runner/work/Szyseb.github.io/Szyseb.github.io/src/components/reactbits`

Normalny cykl (`install/dev/build`) **nie pobiera** komponentów z sieci.
Skrypt waliduje tylko lokalne pliki:

```sh
npm run reactbits:validate
```

Opcjonalna ręczna aktualizacja z oficjalnych źródeł:

```sh
npm run reactbits:update
```

Po aktualizacji należy sprawdzić zmiany i je zacommitować.

## Testy smoke (Playwright)

Testy uruchamiane na buildzie produkcyjnym:

```sh
npm run build
npm run test:smoke
```

Zakres smoke:

- nawigacja i reload dla wszystkich tras
- mailto kontaktowy
- mobilna nawigacja i kliknięcia galerii
- brak poziomego overflow
- brak błędów JS i lokalnych 4xx/5xx
- tryb normalny i `prefers-reduced-motion`
- zrzuty ekranu (desktop/mobile) w artefaktach testów
