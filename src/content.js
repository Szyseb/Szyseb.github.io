export const person = {
  name: 'Sebastian Szyszło',
  shortName: 'Sebastian',
  location: 'Gdańsk',
  github: 'https://github.com/Szyseb',
  // Celowo puste: użytkownik poprosił o miejsca na dane kontaktowe.
  // Wpisz dane, które chcesz świadomie opublikować.
  email: '',
  phone: '',
  linkedin: '',
};

export const projects = [
  {
    id: 'pcsk225', index: '01', title: 'Czas zapisany w sygnale.',
    name: 'Odbiornik i dekoder PCSK225', category: 'Radio / DSP', filter: 'Radio',
    type: 'radio', color: 'mint', status: 'W trakcie realizacji',
    context: 'Praca inżynierska · WETI, Politechnika Gdańska',
    intro: 'Z fal długich do czytelnej informacji o czasie. Kompletny odbiornik, który łączy elektronikę, analizę sygnału i dekodowanie danych.',
    body: 'Projektuję i wykonuję urządzenie do odbioru sygnału czasu PCSK225, transmitowanego równolegle z audycją Programu Pierwszego Polskiego Radia. Celem jest odbiór, zdekodowanie i prezentacja informacji zawartych w sygnale — przede wszystkim czasu urzędowego.',
    tags: ['Fale długie', 'Dekodowanie', 'Urządzenie embedded'],
    points: ['Kompletny tor od odbioru sygnału radiowego po prezentację informacji.', 'Połączenie projektu elektroniki z przetwarzaniem i dekodowaniem sygnału.', 'Działający prototyp pokazany na filmie; urządzenie pozostaje w rozwoju.'],
    video: 'https://youtu.be/zqwH-HtUdGU', videoId: 'zqwH-HtUdGU', url: '',
    cover: '', coverAlt: 'Prototyp odbiornika i dekodera czasu PCSK225',
    gallery: [
      { src: '', alt: 'Prototyp odbiornika PCSK225', label: 'Prototyp odbiornika', hint: 'Zdjęcie urządzenia podczas pracy' },
      { src: '', alt: 'Elektronika odbiornika PCSK225', label: 'Wnętrze projektu', hint: 'Płytka, schemat lub dokumentacja toru odbiorczego' },
    ],
  },
  {
    id: 'localization', index: '02', title: 'Łączność, która pomaga odnaleźć.',
    name: 'System lokalizacji zagubionych dzieci', category: 'LoRa / BLE / GSM', filter: 'Radio',
    type: 'network', color: 'blue', status: 'Projekt grupowy',
    context: 'Projekt grupowy · WETI, Politechnika Gdańska',
    intro: 'Trzy technologie radiowe, jeden cel: pomóc odnaleźć dziecko w rozległej przestrzeni, takiej jak galeria handlowa.',
    body: 'W projekcie grupowym połączyliśmy lokalizatory BLE, autonomiczne stacje poszukujące wykorzystujące LoRa oraz komunikację GSM do przekazywania rodzicom informacji o lokalizacji. Każda warstwa miała własne zadanie w całym systemie.',
    tags: ['LoRa', 'BLE', 'GSM'],
    points: ['BLE — lokalizatory wykrywane przez stacje poszukujące.', 'LoRa — komunikacja autonomicznych stacji.', 'GSM — przekazywanie informacji o lokalizacji rodzicom.'],
    video: '', url: '', cover: '', coverAlt: 'Elementy systemu lokalizacji',
    gallery: [
      { src: '', alt: 'Stacje i lokalizatory systemu', label: 'Elementy systemu', hint: 'Zdjęcie lokalizatora i stacji' },
      { src: '', alt: 'Schemat komunikacji systemu lokalizacji', label: 'Architektura łączności', hint: 'Diagram BLE / LoRa / GSM' },
    ],
  },
  {
    id: 'sn74138', index: '03', title: 'Logika w skali layoutu.',
    name: 'Demultiplekser SN74138', category: 'VLSI / CMOS', filter: 'Układy scalone',
    type: 'layout', color: 'purple', status: 'Projekt akademicki',
    context: 'Inżynieria Układów i Systemów Scalonych · WETI PG',
    intro: 'Projekt SN74138 w Magic VLSI — spojrzenie na układ cyfrowy od strony jego fizycznej realizacji.',
    body: 'Projekt demultipleksera SN74138 został wykonany w Magic VLSI w ramach zajęć z Inżynierii Układów i Systemów Scalonych. To przejście od opisu funkcji logicznej do układu warstw i połączeń.',
    tags: ['Magic VLSI', 'Layout', 'Logika cyfrowa'],
    points: ['Projekt układu cyfrowego na poziomie layoutu.', 'Praca z warstwami i połączeniami w Magic VLSI.', 'Zestawienie funkcji logicznej z jej fizyczną strukturą.'],
    video: '', url: '', cover: '', coverAlt: 'Layout SN74138 w Magic VLSI',
    gallery: [
      { src: '', alt: 'Widok layoutu SN74138', label: 'Layout układu', hint: 'Eksport lub zrzut ekranu z Magic VLSI' },
      { src: '', alt: 'Dokumentacja SN74138', label: 'Struktura i połączenia', hint: 'Schemat lub fragment dokumentacji' },
    ],
  },
  {
    id: 'sevensegment', index: '04', title: 'Od schematu do wskazania.',
    name: 'Sterowanie wskaźnikiem siedmiosegmentowym', category: 'Elektronika / PCB', filter: 'Elektronika',
    type: 'segments', color: 'peach', status: 'Projekt akademicki',
    context: 'Metody Projektowania i Technika Realizacji · WETI PG',
    intro: 'Projekt układu sterującego wskaźnikiem siedmiosegmentowym, przygotowany w KiCadzie.',
    body: 'Układ sterujący wskaźnikiem siedmiosegmentowym zaprojektowałem w KiCadzie w ramach przedmiotu Metody Projektowania i Technika Realizacji. Projekt łączy opracowanie elektroniki z przygotowaniem jej dokumentacji.',
    tags: ['KiCad', 'Schemat', 'Sterowanie'],
    points: ['Projekt elektroniki sterującej wskaźnikiem.', 'Opracowanie projektu w środowisku KiCad.', 'Dokumentacja schematu i rozwiązań układowych.'],
    video: '', url: '', cover: '', coverAlt: 'Układ sterowania wskaźnikiem siedmiosegmentowym',
    gallery: [
      { src: '', alt: 'Projekt układu sterującego', label: 'Widok projektu', hint: 'Zdjęcie lub wizualizacja płytki' },
      { src: '', alt: 'Schemat układu w KiCadzie', label: 'Schemat elektryczny', hint: 'Eksport schematu z KiCada' },
    ],
  },
  {
    id: 'circuit-builder', index: '05', title: 'Elektronika przez eksperyment.',
    name: 'Perfect Circuit Builder', category: 'Java / Edukacja', filter: 'Software',
    type: 'game', color: 'mint', status: 'Projekt akademicki',
    context: 'Języki Programowania Wysokiego Poziomu · WETI PG',
    intro: 'Gra edukacyjna napisana w Javie. Elektronika jako punkt wyjścia do interaktywnego projektu programistycznego.',
    body: 'Perfect Circuit Builder powstał jako projekt z Języków Programowania Wysokiego Poziomu. Gra edukacyjna łączy zainteresowanie elektroniką z projektowaniem aplikacji w języku Java.',
    tags: ['Java', 'Gra edukacyjna', 'Elektronika'],
    points: ['Autorski projekt gry edukacyjnej.', 'Implementacja aplikacji w języku Java.', 'Elektronika przedstawiona w interaktywnej formie.'],
    video: '', url: '', cover: '', coverAlt: 'Ekran gry Perfect Circuit Builder',
    gallery: [
      { src: '', alt: 'Główny ekran Perfect Circuit Builder', label: 'Interfejs gry', hint: 'Zrzut ekranu aplikacji' },
      { src: '', alt: 'Rozgrywka Perfect Circuit Builder', label: 'W trakcie rozgrywki', hint: 'Drugi ekran lub grafika z gry' },
    ],
  },
];

export const workshop = [
  { id: 'hardware', title: 'Elektronika, która nabiera kształtu.', text: 'Od schematu i PCB po montaż, uruchomienie i szukanie przyczyny, gdy rzeczywistość nie zgadza się z symulacją.', tags: ['Altium Designer', 'KiCad', 'Eagle', 'SPICE'], icon: 'cpu' },
  { id: 'radio', title: 'Sygnał to dopiero początek.', text: 'Łączność bezprzewodowa i przetwarzanie sygnałów radiowych. Interesuje mnie droga od zjawiska fizycznego do użytecznej informacji.', tags: ['LoRa', 'BLE', 'DSP', 'MATLAB / Simulink'], icon: 'radio' },
  { id: 'code', title: 'Kod blisko urządzenia.', text: 'Oprogramowanie jest dla mnie częścią rozwiązania: steruje sprzętem, porządkuje dane i pomaga sprawdzać pomysły.', tags: ['C++', 'Python', 'Java', 'Unix'], icon: 'code' },
  { id: 'mechanical', title: 'Nie kończy się na płytce.', text: 'Model 3D, obudowa, wydruk i kolejna iteracja. Mechanika jest naturalnym przedłużeniem projektu elektronicznego.', tags: ['Fusion 360', 'Druk 3D', 'Prototypowanie'], icon: 'box' },
];
export const techStrip = ['Elektronika', 'RF / DSP', 'LoRa / BLE', 'PCB design', 'Embedded', 'CMOS layout', 'Prototypowanie', 'Druk 3D'];
