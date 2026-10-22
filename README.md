# Portfolio

Node.js >=22.12.

```sh
npm install
npm run dev
npm run build
```

## React Bits

Oryginalne komponenty: GooeyNav, WarpText, VariableProximity, BlurText,
SpotlightCard, Magnet, AccordionGallery, ColorBends, Iridescence, Noise
i GradualBlur. Pierwsza instalacja pobiera ich źródła JS/CSS z oficjalnego
rejestru lub repozytorium. Potrzebny jest internet. Nie zastąpiono ich imitacjami.
Zachowaj public/REACT-BITS-LICENSE.txt. Dodaj pobrane źródła do commita,
żeby utrwalić wersję.

## Kontakt

Jedyny adres kontaktowy: astian@gmail.com.
Jest linkiem mailto: w sekcji Kontakt i w stopce.
Brak formularza, backendu, Formspree, SMTP i zewnętrznych usług wysyłkowych.

## Treści i zdjęcia

src/content.js — nazwy, opisy, image oraz images.
public/media — własne zdjęcia, bez EXIF/GPS. Domyślne SVG są placeholderami.
Własny adres, kontakt, profile i lokalizacje nie są wpisane do kodu.
Z danych właściciela zachowano wyłącznie imię i nazwisko oraz publiczny e-mail.
Historia Git i metadane commitów nie zostały zmienione.

## Publikacja

Settings → Pages → GitHub Actions. Własna domena pozostaje w panelu Pages.
Nie ma pliku CNAME. DNS pozostaje bez zmian.

```sh
git add .
git diff --cached --stat
git commit -m "Rebuild portfolio with React Bits"
git push
```

## Zakres sprawdzenia

Sprawdzono skrypt aktualizacji, składnię plików JS oraz CSS. Nie uruchomiono
npm install, kompilacji JSX ani przeglądarki. Nie udało się odczytać aktualnych
źródeł wszystkich komponentów w środowisku rozmowy: pierwsza instalacja i test
lokalny muszą potwierdzić dostępność rejestru i zgodność API. W razie błędu
nie ma cichego podmieniania komponentu na imitację — instalacja zgłosi błąd.
