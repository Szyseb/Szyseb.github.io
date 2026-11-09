export const name = 'Sebastian Szyszło';
export const email = 'szysebastian@gmail.com';

export const projects = [
  {
    id: 'pcsk225',
    title: 'Odbiornik PCSK225',
    description: 'Odbiór radiowego sygnału czasu.',
    detail: 'Po odebraniu sygnału radiowego układ dekoduje zawartą w nim informację o czasie i prezentuje odczyt.',
    tags: ['RF', 'DSP', 'Embedded'],
    status: 'W realizacji',
    images: [],
  },
  {
    id: 'wireless',
    title: 'System lokalizacji',
    description: 'Lokalizatory BLE, stacje LoRa i powiadomienia GSM.',
    detail: 'Projekt grupowy łączący trzy technologie radiowe. BLE służy do wykrywania lokalizatorów, LoRa do komunikacji stacji, a GSM do wysyłania powiadomień.',
    tags: ['BLE', 'LoRa', 'GSM'],
    status: 'Projekt grupowy',
    images: [],
  },
  {
    id: 'layout',
    title: 'SN74138',
    description: 'Layout demultipleksera w Magic VLSI.',
    detail: 'Projekt fizycznego układu warstw i połączeń demultipleksera SN74138 w edytorze Magic VLSI.',
    tags: ['VLSI', 'Magic VLSI'],
    images: [],
  },
  {
    id: 'display',
    title: 'Wskaźnik 7-segmentowy',
    description: 'Układ sterujący zaprojektowany w KiCadzie.',
    detail: 'Układ steruje segmentami wyświetlacza, z których składają się wyświetlane cyfry. Projekt elektroniki powstał w KiCadzie.',
    tags: ['KiCad', 'Elektronika'],
    images: [],
  },
  {
    id: 'game',
    title: 'Perfect Circuit Builder',
    description: 'Gra edukacyjna napisana w Javie.',
    detail: 'Projekt programistyczny, który przenosi temat budowania obwodów elektrycznych do gry edukacyjnej.',
    tags: ['Java', 'Edukacja'],
    images: [],
  },
];

export const toolGroups = [
  ['Elektronika', 'Altium, KiCad, Magic VLSI'],
  ['Programowanie', 'C++, Python, Java'],
  ['Sygnały i modelowanie', 'MATLAB, Fusion 360'],
];
