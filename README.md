# Sebastian Szyszło — szyszlo.me

Nowa, spersonalizowana wersja portfolio. Projekt React + Vite przygotowany jako
wersja zastępcza: nie był edycją folderu użytkownika ani aktualnego repozytorium,
ponieważ nie były dostępne w środowisku rozmowy.

## Kierunek redakcyjny

Portfolio nie powiela CV. Centrum strony stanowią rzeczywiste projekty:
PCSK225, system lokalizacji LoRa/BLE/GSM (projekt grupowy), SN74138,
sterowanie wskaźnikiem siedmiosegmentowym i Perfect Circuit Builder.
Doświadczenie przemysłowe jest tłem dla podejścia do pracy — bez osi czasu,
wyliczania stanowisk, dat, wszystkich certyfikatów i nieistotnych danych.
Lokalizacja: Gdańsk. Politechnika Gdańska pojawia się jako kontekst projektów.
Nie dodano klauzuli rekrutacyjnej, prawa jazdy ani pełnej historii edukacji.

## Uruchomienie

Wymagany Node.js >=22.12.0 z npm. Otwórz terminal w folderze projektu:

```sh
npm install
npm run dev
```

Przy pierwszym npm install skrypt pobiera oryginalny komponent Aurora React Bits
w wariancie JS/CSS z oficjalnego rejestru oraz aktualny tekst jego licencji.
Wymaga to internetu do npm, reactbits.dev i raw.githubusercontent.com.
Nie jest to imitacja nazwana React Bits. Pozostałe komponenty są autorskie.
Jeżeli pobieranie się nie uda, popraw połączenie i uruchom:

```sh
node scripts/reactbits.mjs
```

Pobrane Aurora.jsx, Aurora.css, SOURCE.json i REACT-BITS-LICENSE.txt pozostaw
w repozytorium. Następne uruchomienia używają lokalnej kopii i nie pobierają
komponentu ponownie. SHA-256 rejestru zapisuje się w SOURCE.json.
Licencja jest kopiowana bez modyfikacji. Nie usuwaj jej.
Skrypt instaluje wyłącznie Aurorę; pozostałe elementy strony nie są z React Bits.

## Dane kontaktowe

Zgodnie z prośbą o miejsca na telefon, e-mail i LinkedIn pola pozostawiono puste.
Nie przepisano tych danych automatycznie na publiczną stronę.
W src/content.js uzupełnij person.email, person.phone oraz person.linkedin.
Link do LinkedIn podaj jako pełny adres https://www.linkedin.com/in/...
Po uzupełnieniu pola stają się działającymi linkami mailto:, tel: i LinkedIn.
GitHub jest już ustawiony na https://github.com/Szyseb.

## Zdjęcia i grafiki

1. Umieść pliki w public/media/.
2. W src/content.js znajdź właściwy projekt.
3. Wpisz np. cover: '/media/pcsk225-cover.webp'.
4. W gallery uzupełnij src, np. '/media/pcsk225-prototype.webp'.
5. Uzupełnij prawdziwe opisy alt dla zdjęć.

Lista proponowanych nazw znajduje się w public/media/README.txt.
Brak grafiki nie powoduje zepsutych obrazków: wyświetlany jest zaprojektowany
placeholder. Grafiki w kartach są poglądowe, nie są dokumentacją Twoich urządzeń.
Wizualizacja sygnału PCSK225 nie udaje wyniku pomiaru.
Wideo jest wczytywane z YouTube dopiero po kliknięciu w szczegółach projektu.
Link do filmu zachowano dokładnie taki, jak podał autor. Nie weryfikowano jego treści.

## Jak wgrać źródła do istniejącego repozytorium

Poniższe kroki dotyczą źródeł React i automatycznego budowania przez Actions.
Nie łącz ich z ręczną publikacją dist z gałęzi main.

1. Otwórz sklonowane repozytorium i sprawdź lokalne zmiany:

```sh
cd ~/Desktop/Szyseb.github.io
git status
git branch --show-current
git remote -v
```

Oczekiwany remote: https://github.com/Szyseb/Szyseb.github.io.git
Jeżeli masz niezapisane zmiany, zachowaj je przed kopiowaniem nowej wersji.
Jeżeli working tree jest czyste, pobierz najnowszą wersję:

```sh
git pull --ff-only
```

2. Zrób kopię lokalnego folderu w Finderze, poza repozytorium.
3. Skopiuj zawartość rozpakowanego sebastian-portfolio do katalogu repozytorium.
   Zastąp pliki nowej strony. NIE kasuj i NIE zastępuj folderu .git.
   Trzeba skopiować też .github oraz .gitignore (Cmd+Shift+. pokazuje pliki ukryte).
   Nie przenoś node_modules ani dist.
4. Uruchom i przetestuj projekt:

```sh
npm install
npm run dev
```

Zatrzymaj serwer Ctrl+C, następnie:

```sh
npm run build
npm run preview
```

Zatrzymaj podgląd Ctrl+C.
5. W GitHub: Settings → Pages → Build and deployment → Source: GitHub Actions.
   Zachowaj Custom domain: szyszlo.me i Enforce HTTPS. DNS bez zmian.
6. Sprawdź zmiany przed wysłaniem:

```sh
git status
git diff --stat
```

7. Jeżeli aktualna gałąź to main:

```sh
git add .
git diff --cached --stat
git commit -m "Przebudowa portfolio: projekty, doświadczenie i nowa oprawa"
git push origin main
```

Jeżeli pracujesz na innej gałęzi, nie zmieniaj jej na siłę; sprawdź, czy powinieneś
zrobić merge/PR do main. Workflow z paczki działa na push do main.
Nie używaj git push --force do wdrożenia tej strony.
8. Karta Actions → Publish szyszlo.me: sprawdź wynik wdrożenia.
9. Otwórz https://szyszlo.me i odśwież Cmd+Shift+R.

Po npm install dodaj package-lock.json i pobrane pliki React Bits do commita.
Po dodaniu lockfile możesz zamienić npm install na npm ci w deploy.yml.
Nie uruchamiaj git init ani git remote add origin w repozytorium już sklonowanym.
.gitignore chroni node_modules i dist przed przypadkowym dodaniem.
Stare, nieużywane pliki poprzedniej strony możesz usunąć po zrobieniu kopii;
workflow publikuje wyłącznie nowy dist, nie cały katalog repozytorium.

## Struktura

src/content.js — dane, opisy, galerie, linki i technologie
src/App.jsx — układ i interakcje
src/styles.css — cała oprawa graficzna i responsywność
src/components/Visuals.jsx — SVG i placeholdery
src/components/AuroraBackground.jsx — otoczka oryginalnego komponentu
src/components/reactbits/ — pobierane źródła React Bits
public/media/ — Twoje zdjęcia i grafiki
public/CNAME — szyszlo.me
.github/workflows/deploy.yml — kompilacja i GitHub Pages

## Ograniczenia i testy

W środowisku rozmowy nie uruchomiono npm install, build ani przeglądarki.
Sprawdzono integralność ZIP, JSON, wymagane pliki i zgodność strukturalną.
Nie deklarujemy wyników Lighthouse ani potwierdzonych testów przeglądarek.
Pierwsza kompilacja i test wizualny odbywają się lokalnie.
Oryginalna Aurora zostaje pobrana przy instalacji; jej zgodność z bieżącym
rejestrem zostanie potwierdzona dopiero wtedy.

Animacje respektują prefers-reduced-motion i mają ręczny wyłącznik.
Tło WebGL jest odmontowane poza widokiem oraz po ukryciu karty. Jest fallback CSS.
Fonty są systemowe: brak zewnętrznego Google Fonts, analityki i formularza backend.
Film YouTube stanowi zewnętrzną usługę i ładuje się wyłącznie po interakcji.

## Źródła

React Bits Aurora: https://reactbits.dev/r/Aurora-JS-CSS.json
Licencja: https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md
Vite Pages: https://vite.dev/guide/static-deploy
Git push: https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository
